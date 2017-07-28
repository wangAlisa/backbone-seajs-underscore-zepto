define(['lib/backbone','list/list', 'layer/layer','collection/img'],function(Backbone, List, Layer,ImageCollection){
	// var List = Backbone.View.extend({
	// 	render : function(){
	// 		this.$el.html('<h1>列表页</h1>')
	// 	}
	// })
	// var Layer = Backbone.View.extend({o
	// 	render : function(){
	// 		this.$el.html('<h1>大图页</h1>')
	// 	}
	// })
	var ic = new ImageCollection();
	var list = new List({el : '#app',collection: ic});
	var layer = new Layer({el : '#app',collection : ic});
	// 第一步定义路由
	var Router = Backbone.Router.extend({
		// 定义路由规则
		routes : {
			'layer/:id' : 'showLayer',
			'*other' : 'showList'
		},
		showLayer : function(id){
			// 路由知道渲染那张图
			layer.render(id);
		},
		showList : function(){
			// list.render()
		}
	})
	// 第二步路由实例化
	var router = new Router();
	// console.log(router)
	// 启动路由
	return function(){
		Backbone.history.start();
	}

})