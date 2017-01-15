var Lead = function(leader_config, guid,team_id){
    /**
     * 角色唯一标识
     */
    this.guid = leader_config.guid;
    /**
     * lead血量
     */
    this.HP = leader_config.HP || 10 ;
    /**
     * x坐标
     */
    this.x = leader_config.x || 15;
    /**
     * y坐标
     */
    this.y = leader_config.y || document.body.scrollHeight - 15;
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
    this.velocity = leader_config.velocity || {'x':0,'y':0};
    /**
     * 最大速度
     */
    this.MAX_VELOCITY = leader_config.max_velocity || 3 ;
    /**
     * 加入队伍
     */
    Team.join_team( this.guid, leader_config.team_id || 0 );
    /** 
     * 颜色
     */
     this.color = Team.get_team_color( this.guid ); 
     
    //放入全局中
    Global_Data.leaders[this.guid] = this ;
    Global_Data.key_press[this.guid] = [];
    
    //自动更新画布
    var self = this
    Global_Data.loop_game = Global_Data.loop_game.k_after(function(){
        if ( Global_Data.leaders[self.guid] === null ) return;
        //console.log('Global_Data.loop_game.k_after')
        self.draw_screen()
    })
    //return Global_Data.leaders[this.guid];
    //Utils.set_interval(this.draw_screen, 1000/40, this);
}

/**
 * 重绘画布
 */
Lead.prototype.draw_screen = function(){
    //console.log(this)
    this.change_velocity();
    this.more();
    this.draw_ball();
}

/**
 * 绘制小球
 */
Lead.prototype.draw_ball = function(){
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x +this.radius, this.y+this.radius, 10, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
}

/**
 * 根据键盘按键改变速度
 */
Lead.prototype.change_velocity = function() {
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
}

Lead.prototype.more_left = function(){
    this.velocity['x'] -= this.ACCELERATED_VELOCITY;
}

Lead.prototype.more_right = function(){
    this.velocity['x'] += this.ACCELERATED_VELOCITY;
}

Lead.prototype.more_up = function(){
    this.velocity['y'] += this.ACCELERATED_VELOCITY;
}

Lead.prototype.more_down = function(){
    this.velocity['y'] -= this.ACCELERATED_VELOCITY;
}

Lead.prototype.more = function() {
    //增加反弹
    this.velocity['x'] *= (this.x > base_1.width || this.x < 0)? -1 : 1;
    this.velocity['y'] *= (this.y > base_1.height || this.y < 0)? -1 : 1;
    this.x += this.velocity['x'];
    this.y += this.velocity['y'];
}
Lead.prototype.get_lead = function( guid ) {
    return 
}
