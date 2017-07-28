define(['lib/backbone','lib/underscore','css!./list.css'],function(Backbone,_){
	var List = Backbone.View.extend({
		// 绑定事件
		events : {
			// 为搜一搜按钮绑定事件
			'tap .search span' : 'gotoSearch',
			'tap .nav li' : 'showTypeView',
			// 绑定事件返回顶部
			'tap .go-top':'gotoTop'
		},
		// 定义模板
		tpl: _.template('<a href="<%=href%>"><img style="<%=style%>" src="<%=src%>" alt=""></a>'),
		// 容器高度初始值
		height : 0,
		// rightHeight : 0,
		arr : [],
		initialize : function(){
			this.initDOM();
			// 监听集合数据的改变
			this.listenTo(this.collection,'add',function(model, collection, option){
				// 新添加的模型实例化对象
				this.render(model)
			})
			// 获取数据
			this.getData();
			// 绑定窗口滚动事件
			this.bindEvents();
		},
		bindEvents : function (){
			var me = this;
			var lazyGetData = _.throttle(function(){
				me.getData();
			},400)
			$(window).scroll(function () {
				// 距离底部200像素的时候开始加载
				// 窗口高度wh
				// 滚动条距离顶部的高度sh
				// 自定义高度zh
				// 页面高度
				// bh < = wh+sh+zh
				if($('body').height() <= $(window).height()+ $(window).scrollTop() + 200){
					// 因为滚动事件是高频事件，所以我们要节流 
					lazyGetData();
				}
				me.toggleGoTop();
			})
		},
		// 切换返回底部按钮的显隐
		toggleGoTop : function(){
			if ($(window).scrollTop() > 100) {
				this.$el.find('.go-top').show();
			} else {
				this.$el.find('.go-top').hide();
			}
		},
		gotoTop : function(){
			window.scrollTo(0,0)
		},
		// 容器元素
		initDOM : function(){
			this.dom = this.$el.find(".container")
			// console.log(this.dom)
			// this.leftDOM = this.$el.find('.left-container')
			// this.rightDOM = this.$el.find('.right-container')
		},
		getData : function(){
			this.collection.fetchData();
		},
		render : function(model){
			var me = this;
			// console.log(this.dom)
			var w = $(window).width() -3*6;
			// 1.数据 2.元素 3.模板 4.格式化模板 5.渲染视图
			// 将图片两两匹配，获取匹配后的数据
			var idx = model.get('index');
			// console.log(idx)
			// console.log(this.arr)
			var length = this.arr.length;
			if(idx){/*如果index可以获取到，说明过滤出来了结果，准备渲染*/
				// me.clearView();
				if(length == 1){
					// 说明过滤出来的结果只有一个
					var left = this.arr[0];
					// 左边图片原始宽度
					var zw = left.get('width');
					var zh = left.get('height');
					// 设置左右宽度相同
					var zsw = w/2;
					var h=zsw*zh/zw;
					left.attributes.realWidth=zsw;
					left.attributes.realHeight=h;
				}else{
					// 至少2个
					if(!((idx-1)%2)){
						var left = this.arr[idx-1];
						var right = this.arr[idx];
						if(right){
							// console.log(111)
							// 左图片原始的宽度
							var zw = left.get('width');
							// 左图片原始的高度
							var zh = left.get('height');
							// 右图片原始的高度
							var yw = right.get('width');
							// 右图片原始宽度
							var yh = right.get('height');
							// 行高
							var h = w * zh * yh / (zw * yh + yw * zh);
							// 左图片缩放后的宽度
							var zsw = h * zw / zh;
							// 右图片缩放后的宽度
							var ysw = h * yw / yh;
							// 添加到模型上
							left.attributes.realWidth=zsw;
							right.attributes.realWidth=ysw;
							left.attributes.realHeight=h;
							right.attributes.realHeight=h;
						}else{
							// 当请求回来的图片是奇数个，最后一组右边没有图片
							// 左边图片原始宽度
							var zw = left.get('width');
							var zh = left.get('height');
							// 设置左右宽度相同
							var zsw = w/2;
							var h=zsw*zh/zw;
							left.attributes.realWidth=zsw;
							left.attributes.realHeight=h;
						}
					}
					else{
						if(((idx-1)%2) && idx > 1){
							left = this.arr[idx-2];
							var right = this.arr[idx-1];
							// console.log(left)
							var right = model;
							right.attributes.realWidth = w - left.attributes.realWidth;
							right.attributes.realHeight = left.attributes.realHeight
						}
					}
				}
				model.attributes.index = "";//清空过滤保存的index
			}else{
				// 图片首页正常加载进入该判断
				if(model.get('id')%2){
					// console.log(model.get('id'))
					var left = model;
					// 通过id获取到集合中的模型
					var right = this.collection.get(model.get('id')+1);
					if(right){
						// console.log(111)
						// 左图片原始的宽度
						var zw = left.get('width');
						// 左图片原始的高度
						var zh = left.get('height');
						// 右图片原始的高度
						var yw = right.get('width');
						// 右图片原始宽度
						var yh = right.get('height');
						// 行高
						var h = w * zh * yh / (zw * yh + yw * zh);
						// 左图片缩放后的宽度
						var zsw = h * zw / zh;
						// 右图片缩放后的宽度
						var ysw = h * yw / yh;
						// 添加到模型上
						left.attributes.realWidth=zsw;
						right.attributes.realWidth=ysw;
						left.attributes.realHeight=h;
						right.attributes.realHeight=h;
					}else{
						// 左边图片原始宽度
						var zw = left.get('width');
						var zh = left.get('height');
						// 设置左右宽度相同
						var zsw = w/2;
						var h=zsw*zh/zw;
						left.attributes.realWidth=zsw;
						left.attributes.realHeight=h;
					}
				}else{
					if(!(model.get('id')%2) && model.get('id') > 1){
						var left = this.collection.get(model.get('id')-1)
						// console.log(left)
						var right = model;
						right.attributes.realWidth = w - left.attributes.realWidth;
						right.attributes.realHeight = left.attributes.realHeight
					}

				}
			}

			var height = model.get('realHeight')
			var data = {
				href : '#layer/'+model.get('id'),
				src : model.get('url'),
				style : 'width: ' + model.get('realWidth')+'px ; height: '+ height +'px'
			}
			// console.log(model.attributes.index,model.get('id'),data.style)
			// 格式化模板
			var html = this.tpl(data);
			// if(this.leftHeight <= this.rightHeight){
			// 	this.renderLeft(html,height)
			// }else {
			// 	this.renderRight(html,height)
			// }
			this.renderDom(html,height)
		},
		renderDom : function (html,height){
			this.height += height+6;
			this.dom.append(html);
		},
		// renderLeft : function(html,height){
		// 	// 更新高度，不要忘记底边距
		// 	this.leftHeight+=height+6;
		// 	this.leftDOM.append(html);
		// },
		// renderRight : function(html,height){
		// 	this.rightHeight += height+6;
		// 	this.rightDOM.append(html);
		// },
		// 判断值是否符合条件
		getSearchInputValue : function(){
			return this.$el.find('.search input').val();
		},
		checkValueError : function(val){
			if(/^\s*$/.test(val)){
				return true;
			}
			return false;
		},
		trim : function(val){
			return val.replace(/^\s+|\s+$/g,'');
		},
		collectionFilter : function(val){
			// 过滤输入字段的首尾空白符
			val = this.trim(val);
			return this.collection.filter(function(model, collection, option){
				return model.get('title').indexOf(val)>=0;
			})
		},
		// 清空视图
		clearView : function(){
			// console.log(111)
			// 清空视图中的照片
			// this.leftDOM.html('');
			// this.rightDOM.html('');
			// this.leftHeight = 0 ;
			// this.rightHeight = 0;
			this.dom.html("");
			// console.log(this.dom)
			this.height = 0;
		},
		renderArr : function(arr) {
			var me = this;
			arr.forEach(function(model,index){
				if(model){
					model.attributes.index = index+1;
				// console.log(model.attributes.index)
					me.render(model)
				}
			})
		},
		// 点击搜一搜，回调函数
		gotoSearch : function(){
			var me = this;
			// 获取输入框的内容
			var val = this.getSearchInputValue();
			console.log(val)
			// 校验内容的合法性
			if(this.checkValueError(val)){
				// 如果有错误就打断
				alert('请输入内容')
				return ;
			}
			// 过滤集合
			var result = this.collectionFilter(val);
			// console.log(result)
			// 清空视图
			this.clearView();
			this.arr = result;
			// 渲染视图
			this.renderArr(result);
			// result.forEach(function(model,index,models){
			// 	if(model){
			// 		model.attributes.index = index+1;
			// 	// console.log(model.attributes.index)
			// 		me.render(model)
			// 	}
			// })
			// 清空输入框
			this.$el.find('.search input').val('')
		},
		getNavTypeID : function(e){
			return $(e.target).data('type')
		},
		getNavTypeResult : function(type){
			// 分组获取type类型
			return this.collection.groupBy('type')[type]
		},
		// 分类按钮回调函数
		showTypeView : function(e){
			var type = this.getNavTypeID(e);
			// 过滤类型
			var result = this.getNavTypeResult(type);
			// this.arr = result;
			this.clearView();
			this.arr = result;
			// console.log(this.arr)
			// 渲染视图
			this.renderArr(result)
			// var me = this
			// result.forEach(function(model,index,models){
			// 	if(model){
			// 		model.attributes.index = index+1;
			// 	// console.log(model.attributes.index)
			// 		me.render(model)
			// 	}
			// })
		}
	})
	return List;	
})