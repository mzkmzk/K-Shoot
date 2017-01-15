var Utils = {
    get_url_param: function(key){
        let params = {},
            query = location.search.substring(1),
            pairs = query.split('&');
        for (var i = pairs.length - 1; i >= 0; i--) {
            var pos = pairs[i].indexOf('=');
            if ( pos === -1) continue;
            if ( params[key] ) break;
            var name = pairs[i].substring(0, pos);
            var value = pairs[i].substring(pos+1);
            params[name] = value;
        }
        return params[key] || '';
    },
    /**
     * 检测两个小球是否碰撞
     */
    hit_test_bullet: function( bullet_1, bullet_2 ){
        if ( !(bullet_1 && bullet_2 && bullet_1.x && bullet_1.y && bullet_2.x && bullet_1.y) ) return false;
        var dx = bullet_1.x - bullet_2.x,
            dy = bullet_1.y - bullet_2.y,
            //原点之间距离
            real_distance = ( dx * dx ) + ( dy * dy ), 
            //碰撞的距离 = 两圆半径和
            hit_distance = ( bullet_1.radius + bullet_2.radius ) * ( bullet_1.radius + bullet_2.radius );
        return real_distance <= hit_distance;
    },
    /**
     * 获取guid
     */
    get_guid: function(){
        var guid = localStorage.getItem('k_shoot_guid');

        if ( guid ) return guid;

        guid = Utils.create_guid();
        localStorage.setItem('k_shoot_guid',guid);
    },
    create_guid: function(){
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    },
    get_random_int: function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor( Math.random() * ( max - min + 1 ) ) + min
    },
    set_interval: function(func, time, self, params) {
        function loop_game() {
            func.apply(self,params)
            window.setTimeout(loop_game, 1000/40);
        }
        loop_game()
    },
    set_aop: function(){
        Function.prototype.k_before = function(beforn_fn){
          var __self = this; //保存原函数的引用
          return function(){
            before_fn.apply(this,arguments); //执行新函数
            return __self.apply(this,arguments); //返回原函数并返回原函数的执行结果.
          }
        }

        Function.prototype.k_after = function(after_fn) {
          var __self = this;
          return function() {
            var ret = __self.apply(this,arguments);
            after_fn.apply(this,arguments);
            return ret;
          }
        }
    }
}