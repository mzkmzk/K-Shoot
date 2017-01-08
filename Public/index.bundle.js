(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("k_inteface", [], factory);
	else if(typeof exports === 'object')
		exports["k_inteface"] = factory();
	else
		root["k_inteface"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _Utils = __webpack_require__(1);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * 待做: 
	 */
	var Inteface = {
	    mock: {
	        /*
	        url: 'http://404mzk.com',
	        obj: {
	            
	        },
	        automate: {
	            {
	                obj,method,params,time, num
	            }
	        }
	        */
	    },
	    get_url_param: function get_url_param(key) {
	        var url = undefined.mock.url || location.href,
	            start = url.indexOf('?'),
	            args = {},
	            query = url.substring(start),
	            pairs = query.split('&');
	        for (var i = pairs.length - 1; i >= 0; i--) {
	            var pos = pairs[i].indexOf('=');
	            if (pos === -1) continue;
	            if (args[key]) break; //找到了元素
	            var name = pairs[i].substring(0, pos);
	            var value = pairs[i].substring(pos + 1, pairs[i].length);
	            args[name] = value;
	        }
	        return args[key] || '';
	    },
	    obj: function obj(_obj, method) {
	        var params = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	        var object_type = _Utils2.default.get_type(_obj),
	            return_type = void 0,
	            return_value = void 0;

	        if (undefined.mock.obj && (return_value = undefined.mock.obj[object_type])) {

	            if ((return_type = _Utils2.default.get_type(return_value)) !== 'function') return return_value; //同步

	            return_value.apply(null); //异步
	        } else {
	            method.apply(_obj, params); //调用正常接口
	        }
	    }
	};

	exports.default = Inteface;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	var Utils = {
	    get_type: function get_type(obj) {
	        return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
	    }
	};

/***/ }
/******/ ])
});
;