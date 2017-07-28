define(['lib/backbone','lib/underscore','lib/zepto','css!./layer.css'],function(Backbone , _ , $){
	// 获取窗口高度
	var height = $(window).height();
	// 大图页视图
	var Layer= Backbone.View.extend({
		tpl : _.template($('#tpl_layer').text()),
		imageID : 0,
		// 定义事件
		events : {
			'tap .layer .container img' : 'toggleHeader',
			'swipeLeft .layer .container img' : 'showNextImage',
			'swipeRight .layer .container img' : 'showPrevImage',
			'tap .layer .go-back':"goBack"
		},
		// 定义返回数据
		goBack :function (){
			history.go(-1)
		},
		// 显示后一张
		showNextImage : function (){
			++this.imageID;
			// id是按照顺序绑定，想要知道最后一张，首先要知道当前这一张
			var model = this.collection.get(this.imageID);
			if(!model){
				alert('已经是最后一张了');
				--this.imageID;
				return
			}else{
				// model存在，我们更新
				// this.updeViwew(model)
				// 将跟心记录在历史中
				location.hash = '#layer/'+model.get('id')
			}
		},
		showPrevImage : function (){
			--this.imageID;
			var model = this.collection.get(this.imageID);
			if(model){
				// 模型存在更新视图
			// this.updeView(model)
			// 将更新记录在历史记录中
			location.hash = '#layer/' + model.get('id');
			} else {
				alert('已经是第一张了');
				++this.imageID;
				return;

			}
		},
		// 更新视图的方法
		updateView : function(model){
			// 更新title
			this.$el.find('.layer .header h1').html(model.get('title'))
			// 更新图片
			this.$el.find('.layer .container img').attr('src',model.get('url'))
		},
		// 切换头部
		toggleHeader : function () {
			// 获取header元素，切换显隐
			this.$el.find('.layer .header').toggle()
		},
		// 定义渲染方法
		render : function (id){
			// this.$el.html('<h1>大图页</h1>')
			// 根据ID获取模型，模型在集合中存储
			var model = this.collection.get(id);
			if(!model){
				// 重定向
				location.hash = '';
				// nackbone重定向
				// Backbone.histiry.localtion.replace('#abc')
				return;
			}
			// 获取数据
			var data = {
				style : 'line-height: '+ height + 'px;',
				src:model.get('url'),
				title:model.get('title')
			}
			// 获取模板数据
			// 格式化模板
			var html = this.tpl(data);
			// console.log(his.tpl)
			// 渲染
			this.$el.find('.layer').html(html)
		}
	})
	return Layer;
})