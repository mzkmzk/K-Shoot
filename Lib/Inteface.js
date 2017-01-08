'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _Utils = require('./Utils');

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