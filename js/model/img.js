define(['lib/backbone','lib/zepto'],function(Backbone,$){
	//容器的宽度
	// var w = ($(window).width() - 3*6)/2;
	// 窗口宽度
	// var w = $(window).width();
	var ImageModel = Backbone.Model.extend({
		initialize : function(){
		// var h = (this.attributes.height * w)/this.attributes.width;
			// 保存宽高
			// this.attributes.realwidth = w;
			// this.attributes.realheight = h;
		}
	})
	// var im = new ImageModel({
	// 	"title": "精彩建筑摄影作品",
	// 	"url": "img/01.jpg",
	// 	"type": 1,
	// 	"width": 640,
	// 	"height": 400
	// })
	return ImageModel;
})


