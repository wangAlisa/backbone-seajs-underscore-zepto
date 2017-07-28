require.config({
	// 配置css插值
	map : {
		'*': {
			'css' : 'lib/css'
		}
	},
	// 将库文件转化成模块
	shim : {
		'lib/backbone' : {
			deps : ['lib/underscore','lib/zepto', 'lib/zepto.touch'],
			exports : 'Backbone'
		},
		'lib/underscore' : {
			exports : '_'
		},
		'lib/zepto' : {
			exports : '$'
		},
		'lib/zepto.touch' : {
			deps :['lib/zepto'],
			exports : '$'
		}
	},
	// paths : {
	// 	router : 'modules/router/router'
	// }
})
require(['router/router', 'css!reset.css'], function (Router) {
	Router();
})