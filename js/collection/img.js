
define(['lib/backbone', 'lib/zepto', 'model/img'], function (Backbone, $, ImageModel) {
	var ImageCollection = Backbone.Collection.extend({
		model: ImageModel,
		url: 'data/imageList.json',
		num: 0,
		fetchData: function () {
			var me = this;
			// $.get('data/imageList.json', function (res) {
			$.get(me.url, function (res) {
				// console.log(res)
				if (res && res.errno === 0) {
					// res.data随机排序
					res.data.sort(function () {
						return Math.random() > 0.5 ? 1 : -1;
					})
					// 添加id属性
					res.data.forEach(function (obj, index, arr) {
						// 为每一个成员添加一个id

						obj.id = ++me.num;
					})
					// var cols = 2;
					// var rows = parseInt(res.data.length /2);
					// var arr = new Array();
					// for(var j = 0; j<rows;j++){
					// 	arr[j] = new Array();
					// 	for(var i=0; i<cols; i++){
					// 		arr[j][i] = res.data[j*10+i]
					// 	}
					// }
					// console.log(arr)
					// console.log(arr[0])
					// console.log(res);
					// 将数据添加在集合中
					me.add(res.data)
					 // me.add(arr)

				}
			})
		}
	})

	// 通过集合拉去数据
	// var ic = new ImageCollection();
	// // 拉去数据
	// ic.fetchData();
	// 不能直接使用fetch: 返回数据结构不对，我们希望对返回的数组随机排序
	// ic.fetch({
	// 	success: function (col, res, option) {
	// 		console.log(col)
	// 	}
	// });

	// 暴漏接口
	return ImageCollection;
})