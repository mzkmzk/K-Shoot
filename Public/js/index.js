webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _Global_Data = __webpack_require__(2);

	var _Global_Data2 = _interopRequireDefault(_Global_Data);

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Key_Press = __webpack_require__(4);

	var _Key_Press2 = _interopRequireDefault(_Key_Press);

	var _Leader = __webpack_require__(5);

	var _Leader2 = _interopRequireDefault(_Leader);

	var _canvas2 = __webpack_require__(8);

	var _canvas3 = _interopRequireDefault(_canvas2);

	var _game_ = __webpack_require__(11);

	var _game_2 = _interopRequireDefault(_game_);

	var _game_3 = __webpack_require__(14);

	var _game_4 = _interopRequireDefault(_game_3);

	var _game_5 = __webpack_require__(15);

	var _game_6 = _interopRequireDefault(_game_5);

	var _game_7 = __webpack_require__(16);

	var _game_8 = _interopRequireDefault(_game_7);

	var _game_9 = __webpack_require__(17);

	var _game_10 = _interopRequireDefault(_game_9);

	__webpack_require__(18);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var computer_index = _Utils2['default'].get_url_param('computer_index'),
	    game_array = [null, _game_2['default'], _game_4['default'], _game_6['default'], _game_8['default'], _game_10['default']],
	    pk = _Utils2['default'].get_url_param('pk'),
	    leader;

	//clear_base_1();

	/**
	 * 注册键盘监听事件
	 */

	_Utils2['default'].set_aop();

	page_init();

	function page_init() {
	    _Key_Press2['default'].init();
	    _canvas3['default'].init();
	    leader = new _Leader2['default']({
	        guid: _Global_Data2['default'].guid,
	        team_id: 0
	    });
	    check_computer();
	    renderer_game_num(game_array);
	    bin_event();
	    //Web_Pk.init(); //暂时去掉webpk
	    // Web_Pk.send('get_all_leader' )//暂时去掉webpk
	    //new Computer();
	}

	/**
	 * 初始化电脑
	 */
	function check_computer() {
	    if (!game_array[computer_index]) return;

	    game_array[computer_index].init();
	}

	/**
	 * 渲染管卡按钮
	 */
	function renderer_game_num(game_array) {

	    var j_game_num_select = document.querySelector('.j_game_num_select'),
	        buttom_array_string = '';

	    if (!game_array instanceof Array) return;
	    if (!j_game_num_select) return;

	    _Utils2['default'].each(game_array, function (element, index) {
	        if (!element) return;

	        buttom_array_string += '<a href="?computer_index=' + index + '"><button >关卡' + index + '</button></a>';
	    });
	    j_game_num_select.innerHTML += buttom_array_string;
	}

	function bin_event() {
	    var j_game_num_select_class_value = document.querySelector('.j_game_num_select').classList.value,
	        is_hidden;
	    document.querySelector('.j_select_game').onclick = function () {
	        is_hidden = document.querySelector('.j_game_num_select').classList.value.indexOf('hidden') !== -1;
	        if (is_hidden) {
	            document.querySelector('.j_game_num_select').classList.value = document.querySelector('.j_game_num_select').classList.value.replace('hidden', '');
	        } else {
	            document.querySelector('.j_game_num_select').classList.value += ' hidden';
	        }
	    };
	    document.querySelector('.j_select_tips').onclick = function () {
	        alert('方向键: w(上) s(下) a(左) d(右) \n \
	            子弹选择: \n \
	                  j: 匀速圆周运动 \n \
	                  k: 螺旋允许圆周运动 \n \
	                  l: 贝塞尔运动');
	    };
	}

	function check_pk() {
	    if (!pk) return;
	}

	/**
	 * 清除画布
	 */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	window.Global_Data = {
	    guid: _Utils2['default'].get_guid(),
	    leaders: {},
	    teams: [],
	    bullets: [],
	    key_press: {},
	    computer_index: 0,
	    loop_game: function loop_game() {
	        //console.log('Global_Data.loop_game')
	    }
	};

	exports['default'] = window.Global_Data;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var Utils = {
	    get_url_param: function get_url_param(key) {
	        var params = {},
	            query = location.search.substring(1),
	            pairs = query.split('&');
	        for (var i = pairs.length - 1; i >= 0; i--) {
	            var pos = pairs[i].indexOf('=');
	            if (pos === -1) continue;
	            if (params[key]) break;
	            var name = pairs[i].substring(0, pos);
	            var value = pairs[i].substring(pos + 1);
	            params[name] = value;
	        }
	        return params[key] || '';
	    },
	    /**
	     * 检测两个小球是否碰撞
	     */
	    hit_test_bullet: function hit_test_bullet(bullet_1, bullet_2) {
	        if (!(bullet_1 && bullet_2 && bullet_1.x && bullet_1.y && bullet_2.x && bullet_1.y)) return false;
	        var dx = bullet_1.x - bullet_2.x,
	            dy = bullet_1.y - bullet_2.y,

	        //原点之间距离
	        real_distance = dx * dx + dy * dy,

	        //碰撞的距离 = 两圆半径和
	        hit_distance = (bullet_1.radius + bullet_2.radius) * (bullet_1.radius + bullet_2.radius);
	        return real_distance <= hit_distance;
	    },
	    /**
	     * 获取guid
	     */
	    get_guid: function get_guid() {
	        var guid = localStorage.getItem('k_shoot_guid');

	        if (guid) return guid;

	        guid = Utils.create_guid();
	        localStorage.setItem('k_shoot_guid', guid);
	    },
	    create_guid: function create_guid() {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,
	                v = c == 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    },
	    get_random_int: function get_random_int(min, max) {
	        min = Math.ceil(min);
	        max = Math.floor(max);
	        return Math.floor(Math.random() * (max - min + 1)) + min;
	    },
	    set_interval: function set_interval(func, time, self, params) {
	        function loop_game() {
	            func.apply(self, params);
	            window.setTimeout(loop_game, 1000 / 40);
	        }
	        loop_game();
	    },
	    set_aop: function set_aop() {
	        Function.prototype.k_before = function (beforn_fn) {
	            var __self = this; //保存原函数的引用
	            return function () {
	                before_fn.apply(this, arguments); //执行新函数
	                return __self.apply(this, arguments); //返回原函数并返回原函数的执行结果.
	            };
	        };

	        Function.prototype.k_after = function (after_fn) {
	            var __self = this;
	            return function () {
	                var ret = __self.apply(this, arguments);
	                after_fn.apply(this, arguments);
	                return ret;
	            };
	        };
	    },
	    type: function type(obj) {
	        return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase();
	    },
	    each: function each(obj, iterator, context) {
	        var i, key;
	        if (this.type(obj) === 'number') {
	            for (i = 0; i < obj; i++) {
	                iterator(i, i);
	            }
	        } else if (obj.length === +obj.length) {
	            for (i = 0; i < obj.length; i++) {
	                if (iterator.call(context, obj[i], i, obj) === false) break;
	            }
	        } else {
	            for (key in obj) {
	                if (iterator.call(context, obj[key], key, obj) === false) break;
	            }
	        }
	    }
	};

	exports['default'] = Utils;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	/**
	 * 记录按键
	 * @type {{key_press: Array, init_key_up: Function, init_key_down: Function, init: Function}}
	 */
	var Key_Press = {
	    key_press: [],
	    init_key_up: function init_key_up() {
	        document.onkeyup = function (e) {
	            e = e || window.event;
	            //console.log('放松了' + e.keyCode);
	            //Global_Data.
	            if (Global_Data.key_press[Global_Data.guid][e.keyCode] === true) {
	                //暂时去掉webpk    Web_Pk.send('key_press_up', { key: e.keyCode } )
	            }
	            Global_Data.key_press[Global_Data.guid][e.keyCode] = false;
	        };
	    },
	    init_key_down: function init_key_down() {
	        document.onkeydown = function (e) {
	            e = e || window.evnet;
	            //console.log('按下了' + e.keyCode);
	            //当按键变化时才发送webscocket
	            if (Global_Data.key_press[Global_Data.guid][e.keyCode] === false) {
	                //暂时去掉webpk   Web_Pk.send('key_press_down', { key: e.keyCode } )
	            }
	            Global_Data.key_press[Global_Data.guid][e.keyCode] = true;
	        };
	    },
	    init: function init() {
	        this.init_key_down();
	        this.init_key_up();
	    }
	};

	exports["default"] = Key_Press;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Team = __webpack_require__(6);

	var _Team2 = _interopRequireDefault(_Team);

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _canvas2 = __webpack_require__(8);

	var _canvas3 = _interopRequireDefault(_canvas2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ctx = _canvas3['default'].ctx;
	var Leader = function Leader(leader_config, guid, team_id) {
	  /**
	   * 角色唯一标识
	   */
	  this.guid = leader_config.guid;
	  /**
	   * 保存当时创建的构造函数
	   */
	  this.arguments = arguments;
	  /**
	   * lead血量
	   */
	  this.HP = leader_config.HP || 10;
	  /**
	   * x坐标
	   */
	  this.x = leader_config.x || _Utils2['default'].get_random_int(0, base_1.width) || 15;
	  /**
	   * y坐标
	   */
	  this.y = leader_config.y || _Utils2['default'].get_random_int(0, base_1.height) || base_1.height - 15; //document.body.scrollHeight - 15;
	  /**
	   * 半径
	   */
	  this.radius = leader_config.radius || 10;
	  /**
	   * 加速度
	   */
	  this.ACCELERATED_VELOCITY = leader_config.accelerated_velocity || 0.09;
	  /**
	   * 初始速度
	   */
	  this.velocity = leader_config.velocity || { 'x': 0, 'y': 0 };
	  /**
	   * 最大速度
	   */
	  this.MAX_VELOCITY = leader_config.max_velocity || 3;
	  /**
	   * 初始化键盘信息
	   */
	  //this.key_press = [];
	  /**
	   * 加入队伍
	   */
	  _Team2['default'].join_team(this.guid, leader_config.team_id || 0);
	  /** 
	   * 颜色
	   */
	  this.color = _Team2['default'].get_team_color(this.guid);

	  //放入全局中
	  Global_Data.leaders[this.guid] = this;
	  /**
	   * 初始化键盘信息
	   */
	  Global_Data.key_press[this.guid] = [];

	  /**
	   * 自动更新画布
	   */
	  var self = this;
	  Global_Data.loop_game = Global_Data.loop_game.k_after(function () {
	    if (Global_Data.leaders[self.guid] === null) return;
	    //console.log('Global_Data.loop_game.k_after')
	    self.draw_screen();
	  });
	  /**
	   * 通知其他玩家
	   */
	  if (!leader_config.is_not_send) {}
	  //Web_Pk.send('leader_init', { leader_config: leader_config } )


	  //return Global_Data.leaders[this.guid];
	  //Utils.set_interval(this.draw_screen, 1000/40, this);
	};

	/**
	 * 重绘画布
	 */
	Leader.prototype.draw_screen = function () {
	  //console.log(this)
	  this.change_velocity();
	  this.more();
	  this.draw_ball();
	};

	/**
	 * 绘制小球
	 */
	Leader.prototype.draw_ball = function () {
	  var ctx = _canvas3['default'].ctx;
	  ctx.beginPath();
	  ctx.fillStyle = this.color;
	  ctx.arc(this.x + this.radius, this.y + this.radius, 10, 0, Math.PI * 2, true);
	  ctx.closePath();
	  ctx.fill();
	};

	/**
	 * 根据键盘按键改变速度
	 */
	Leader.prototype.change_velocity = function () {
	  var key_press = Global_Data.key_press[this.guid];
	  //console.log(key_press);
	  if (key_press[65] === true) {
	    this.more_left();
	  }
	  if (key_press[68] === true) {
	    this.more_right();
	  }
	  if (key_press[83] === true) {
	    this.more_up();
	  }
	  if (key_press[87] === true) {
	    this.more_down();
	  }
	};

	Leader.prototype.more_left = function () {
	  this.velocity['x'] -= this.ACCELERATED_VELOCITY;
	};

	Leader.prototype.more_right = function () {
	  this.velocity['x'] += this.ACCELERATED_VELOCITY;
	};

	Leader.prototype.more_up = function () {
	  this.velocity['y'] += this.ACCELERATED_VELOCITY;
	};

	Leader.prototype.more_down = function () {
	  this.velocity['y'] -= this.ACCELERATED_VELOCITY;
	};

	Leader.prototype.more = function () {
	  //增加反弹
	  this.velocity['x'] *= this.x > base_1.width || this.x < 0 ? -1 : 1;
	  this.velocity['y'] *= this.y > base_1.height || this.y < 0 ? -1 : 1;
	  this.x += this.velocity['x'];
	  this.y += this.velocity['y'];
	};
	Leader.prototype.get_lead = function (guid) {
	  return;
	};

	exports['default'] = Leader;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _COLOR = __webpack_require__(7);

	var _COLOR2 = _interopRequireDefault(_COLOR);

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Team = {
	    join_team: function join_team(guid, team_id) {
	        if (Global_Data.teams[team_id]) {
	            Global_Data.teams[team_id].leaders.push(guid);
	        } else {
	            Global_Data.teams[team_id] = {};
	            Global_Data.teams[team_id].color = _COLOR2['default'].splice(_Utils2['default'].get_random_int(0, _COLOR2['default'].length - 1), 1)[0];
	            Global_Data.teams[team_id].leaders = [guid];
	        }
	        return Global_Data.teams[team_id];
	    },
	    get_team_color: function get_team_color(guid) {
	        var team = Global_Data.teams.find(function (element) {
	            if (element.leaders.indexOf(guid) !== -1) return true;
	        });
	        return team ? team.color : '';
	    },
	    is_same_team: function is_same_team(guid_1, guid_2) {
	        var guid_1_team_index, guid_2_team_index;
	        for (var i = Global_Data.teams.length - 1; i >= 0; i--) {
	            guid_1_team_index = Global_Data.teams[i].leaders.indexOf(guid_1);
	            guid_2_team_index = Global_Data.teams[i].leaders.indexOf(guid_2);
	            if (guid_1_team_index !== -1 && guid_2_team_index !== -1) return true;
	        }
	        return false;
	    }
	};

	exports['default'] = Team;

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	/**
	 * 色彩取于 https://zh.wikipedia.org/wiki/%E9%A2%9C%E8%89%B2%E5%88%97%E8%A1%A8
	 */
	var COLOR = ['#FFFFFF', //无色彩系 - 白色
	'#FF0000', //常用色系 - 红色
	'#66FF00', //常用色系 - 黄绿色
	'#0000FF', //常用色系 - 蓝色
	'#FF8C69' //浅色系 - 鲜肉色
	];

	exports['default'] = COLOR;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Bullets = __webpack_require__(9);

	var _Bullets2 = _interopRequireDefault(_Bullets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Canvas = {
	    ctx: null,
	    init: function init() {
	        var base_1 = document.getElementById('base_1'),
	            ctx;

	        base_1.width = document.documentElement.clientWidth;
	        base_1.height = document.documentElement.clientHeight;

	        Canvas.ctx = base_1.getContext('2d');

	        function clear_base_1() {
	            Canvas.ctx.fillStyle = "black";
	            Canvas.ctx.fillRect(0, 0, base_1.width, base_1.height); //还原掉上次的白色球
	        }
	        loop_game();
	        function loop_game() {

	            clear_base_1();
	            Global_Data.loop_game();
	            //lead.draw_screen()
	            _Bullets2['default'].draw_screen();
	            window.setTimeout(loop_game, 1000 / 40);
	        }
	    }

	};

	exports['default'] = Canvas;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Team = __webpack_require__(6);

	var _Team2 = _interopRequireDefault(_Team);

	var _canvas2 = __webpack_require__(8);

	var _canvas3 = _interopRequireDefault(_canvas2);

	var _Bullet = __webpack_require__(10);

	var _Bullet2 = _interopRequireDefault(_Bullet);

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Bullets = {
	    TYPE: ['CIRCULAR_MOTION', 'SPIRAL', 'BEZIER'],
	    /** 
	     * 去除碰撞子弹
	     */
	    remove_hit_bullets: function remove_hit_bullets() {
	        var i,
	            j,
	            z,
	            leaders_key = Object.keys(Global_Data.leaders),
	            leader,
	            is_hit,
	            remove_bullets_total;
	        for (i = Global_Data.bullets.length - 1; i >= 0; i--) {
	            for (j = Global_Data.bullets.length - 1; j >= 0; j--) {
	                //检查子弹碰撞
	                if (i === j) continue; //同一子弹

	                //碰撞了
	                if (_Utils2['default'].hit_test_bullet(Global_Data.bullets[i], Global_Data.bullets[j]) && //碰撞了
	                Global_Data.bullets[i].lead_guid !== Global_Data.bullets[j].lead_guid) {
	                    //不同lead的子弹
	                    Global_Data.bullets.splice(i, 1);
	                    Global_Data.bullets.splice(j - 1, 1);
	                    //i = i - 2; 
	                    //j = j - 2;
	                }
	            }
	            for (z = leaders_key.length - 1; z >= 0; z--) {
	                leader = Global_Data.leaders[leaders_key[z]];
	                if (_Utils2['default'].hit_test_bullet(leader, Global_Data.bullets[i]) && //碰撞了
	                !_Team2['default'].is_same_team(leader.guid, Global_Data.bullets[i].lead_guid)) {
	                    //非同组子弹
	                    //leader.guid !==  Global_Data.bullets[i].lead_guid) { //非自己的子弹
	                    if (--leader.HP === 0) {
	                        remove_bullets_total = 0;
	                        Global_Data.leaders[leader.guid] = null;
	                        /*for (var i = Global_Data.bullets.length - 1; i >= 0; i--) {
	                            Global_Data.bullets[i]
	                            if (element.lead_guid === leader.guid) {
	                                remove_bullets_total++
	                            }
	                        }*/
	                        for (var x = Global_Data.bullets.length - 1; x >= 0; x--) {
	                            if (Global_Data.bullets[x].lead_guid === leader.guid) {
	                                remove_bullets_total++;
	                                console.log(Global_Data.bullets);
	                                Global_Data.bullets.splice(x, 1);
	                            }
	                            Global_Data.bullets[i];
	                        }

	                        //i = i - remove_bullets_total;
	                        //j = j - remove_bullets_total;
	                    }

	                    //console.log(leader.guid +' 被攻击了 HP: '+leader.HP)
	                }
	            }
	        }
	    },
	    /**
	     * 绘制子弹
	     */
	    draw_bullet: function draw_bullet() {
	        //console.log(Global_Data.bullets);
	        Global_Data.bullets.forEach(function (element) {
	            var ctx = _canvas3['default'].ctx;
	            switch (element.type) {
	                case 'CIRCULAR_MOTION':
	                    //匀速圆周
	                    ctx.beginPath();
	                    ctx.fillStyle = element.color;
	                    //ctx.fillStyle = 'white';
	                    element.x = element.circle.x + Math.cos(element.circle.angle) * element.circle.radius;
	                    element.y = element.circle.y + Math.sin(element.circle.angle) * element.circle.radius;
	                    element.circle.angle += element.speed;
	                    ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2, true);
	                    ctx.closePath();
	                    ctx.fill();
	                    break;
	                case 'SPIRAL':
	                    //螺旋
	                    var RADIUS_INC = 2; //设置每次增加的半径
	                    ctx.beginPath();
	                    ctx.fillStyle = element.color;
	                    //ctx.fillStyle = 'yellow';
	                    element.x = element.circle.x + Math.cos(element.circle.angle) * element.circle.radius;
	                    element.y = element.circle.y + Math.sin(element.circle.angle) * element.circle.radius;
	                    element.circle.angle += element.speed;
	                    element.circle.radius += RADIUS_INC;
	                    ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2, true);
	                    ctx.closePath();
	                    ctx.fill();
	                    break;
	                case 'BEZIER':
	                    //贝塞尔  
	                    var p1 = { x: element.circle.x, y: element.circle.y }; //起点
	                    var p2 = { x: 0, y: 0 }; //贝塞尔点1
	                    var p3 = { x: base_1.width, y: base_1.height }; //贝塞尔点2
	                    var p4 = { x: base_1.width, y: 0 }; //终点

	                    var cx = 3 * (p2.x - p1.x),
	                        bx = 3 * (p3.x - p2.x) - cx,
	                        ax = p4.x - p1.x - cx - bx,
	                        cy = 3 * (p2.y - p1.y),
	                        by = 3 * (p3.y - p2.y) - cy,
	                        ay = p4.y - p1.y - cy - by,
	                        t = element.t,
	                        xt = ax * (t * t * t) + bx * (t * t) + cx * t + p1.x,
	                        yt = ay * (t * t * t) + by * (t * t) + cy * t + p1.y;
	                    element.x = xt;
	                    element.y = yt;
	                    //console.log(xt);
	                    //console.log(yt);
	                    if (element.t <= 1) element.t += element.bezier_speed;
	                    ctx.beginPath();
	                    ctx.fillStyle = element.color;
	                    //ctx.fillStyle = 'red';
	                    ctx.arc(element.x, element.y, element.radius, 0, Math.PI * 2, true);
	                    ctx.closePath();
	                    ctx.fill();
	                    break;
	            }
	        });
	    },
	    /**
	     * 发射子弹
	     */
	    send: function send() {

	        var guids = Object.keys(Global_Data.leaders),
	            guid,
	            i;

	        for (i = guids.length - 1; i >= 0; i--) {

	            guid = guids[i];

	            if (Global_Data.leaders[guid] === null) continue;
	            if (Global_Data.key_press[guid][74] === true) {
	                Bullets.send_bullet(Bullets.TYPE[0], guid);
	                //Global_Data.bullets.push(new Bullet('CIRCULAR_MOTION', guid));
	                //Music.play('bullet');
	            } else if (Global_Data.key_press[guid][75] === true) {
	                Bullets.send_bullet(Bullets.TYPE[1], guid);
	                //Global_Data.bullets.push(new Bullet('SPIRAL', guid));
	                //Music.play('bullet');
	            } else if (Global_Data.key_press[guid][76] === true) {
	                Bullets.send_bullet(Bullets.TYPE[2], guid);
	                //Global_Data.bullets.push(new Bullet('BEZIER', guid));
	                //Music.play('bullet');
	            }
	        }
	    },
	    send_bullet: function send_bullet(type, guid) {
	        Global_Data.bullets.push(new _Bullet2['default'](type, guid));
	        //Music.play('bullet');
	    },
	    draw_screen: function draw_screen() {
	        this.send();
	        this.draw_bullet();
	        this.remove_hit_bullets();
	    }
	};

	exports['default'] = Bullets;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Team = __webpack_require__(6);

	var _Team2 = _interopRequireDefault(_Team);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Bullet = function Bullet(type, lead_guid) {
	  /**
	   * 球的主任
	   */
	  this.lead_guid = lead_guid,
	  /**
	   * 球的颜色
	   */
	  this.color = _Team2['default'].get_team_color(lead_guid),
	  /**
	   * 子弹射出时跟主角的x
	   */
	  this.x = Global_Data.leaders[lead_guid].x,
	  /**
	   * 子弹射出时跟主角的y
	   */
	  this.y = Global_Data.leaders[lead_guid].y,
	  /**
	   * 子弹和主角的半径一样
	   */
	  this.radius = Global_Data.leaders[lead_guid].radius * 0.5;
	  /**
	   * 子弹类型
	   */
	  this.type = type;
	  /**
	   * 子弹遵循的圆
	   */
	  this.circle = {
	    x: Global_Data.leaders[lead_guid].x,
	    y: Global_Data.leaders[lead_guid].y,
	    radius: 125,
	    angle: 0,
	    radius_inc: 2
	  },
	  /**
	   * 角速度
	   */
	  this.speed = .1;
	  /**
	   * 用于布尔尔记录行程, 为1时已经到终点
	   */
	  this.t = 0;
	  /**
	   * 贝塞尔的角速度
	   */
	  this.bezier_speed = .01;
	};

	exports['default'] = Bullet;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Game = __webpack_require__(12);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var game_1 = new _Game2['default']({
	    computer_array: [{}]
	});

	exports['default'] = game_1;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Computer = __webpack_require__(13);

	var _Computer2 = _interopRequireDefault(_Computer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var Game = function Game(game_config) {
	    this.computer_array = game_config.computer_array || [];
	};

	Game.prototype.init = function () {
	    for (var i = this.computer_array.length - 1; i >= 0; i--) {
	        new _Computer2['default'](this.computer_array[i]);
	    }
	};

	exports['default'] = Game;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Leader = __webpack_require__(5);

	var _Leader2 = _interopRequireDefault(_Leader);

	var _Utils = __webpack_require__(3);

	var _Utils2 = _interopRequireDefault(_Utils);

	var _Bullets = __webpack_require__(9);

	var _Bullets2 = _interopRequireDefault(_Bullets);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var ACTION = [
	//'more_left',
	'more_right',
	//'more_up',
	'more_down'];

	var Computer = function Computer(leader_config, computer_config) {
	    if (!(this instanceof Computer)) return new Computer(leader_config, computer_config);

	    var leader = new _Leader2['default']({
	        guid: 'computer_' + Global_Data.computer_index,
	        team_id: 1,
	        x: _Utils2['default'].get_random_int(0, base_1.width),
	        y: _Utils2['default'].get_random_int(0, base_1.height)
	    }),
	        guid = leader.guid;

	    Global_Data.computer_index++;
	    console.log(leader);
	    //自动移动
	    var move_interval = setInterval(function () {
	        if (!Global_Data.leaders[guid]) {
	            clearInterval(move_interval);
	            return;
	        }
	        var action_num = _Utils2['default'].get_random_int(0, ACTION.length - 1);
	        leader[ACTION[action_num]]() * 1000;
	    }, 1000 / 40);

	    //自动发子弹
	    var bullet_interval = setInterval(function () {
	        if (!Global_Data.leaders[guid]) {
	            clearInterval(bullet_interval);
	            return;
	        }
	        var bullet_action_num = _Utils2['default'].get_random_int(0, _Bullets2['default'].TYPE.length - 1);
	        _Bullets2['default'].send_bullet(_Bullets2['default'].TYPE[bullet_action_num], leader.guid);
	    }, 1000 / 4);
	};

	exports['default'] = Computer;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Game = __webpack_require__(12);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var game_2 = new _Game2['default']({
	    computer_array: [{}, {}]
	});
	exports['default'] = game_2;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Game = __webpack_require__(12);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var game_3 = new _Game2['default']({
	    computer_array: [{}, {}, {}]
	});

	exports['default'] = game_3;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Game = __webpack_require__(12);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var game_4 = new _Game2['default']({
	    computer_array: [{}, {}, {}, {}]
	});

	exports['default'] = game_4;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _Game = __webpack_require__(12);

	var _Game2 = _interopRequireDefault(_Game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var game_5 = new _Game2['default']({
	    computer_array: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
	});

	exports['default'] = game_5;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(21)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js!../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(20)();
	// imports


	// module
	exports.push([module.id, "body {\n  margin: 0; }\n\ncanvas {\n  position: absolute; }\n\n.display_handle {\n  position: absolute;\n  z-index: 2; }\n  .display_handle button {\n    margin: 10px; }\n\n.game_num_select {\n  position: absolute;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%; }\n  .game_num_select button {\n    padding: 10px;\n    margin: 10px; }\n\n.hidden {\n  display: none; }\n", ""]);

	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
]);