var Bullets = {
    TYPE: [
        'CIRCULAR_MOTION',
        'SPIRAL',
        'BEZIER'
    ],
    /** 
     * 去除碰撞子弹
     */
    remove_hit_bullets: function(){
        var i, j, z,
            leaders_key = Object.keys(Global_Data.leaders),
            leader,
            is_hit;
        for ( i = Global_Data.bullets.length - 1; i >= 0; i--) {
            for ( j = Global_Data.bullets.length - 1; j >= 0; j--) { //检查子弹碰撞
                if ( i === j ) continue; //同一子弹
                
                //碰撞了
                if ( Utils.hit_test_bullet( Global_Data.bullets[i], Global_Data.bullets[j] ) && //碰撞了
                      Global_Data.bullets[i].lead_guid !==  Global_Data.bullets[j].lead_guid  ) { //不同lead的子弹
                    Global_Data.bullets.splice(i, 1 );
                    Global_Data.bullets.splice(j - 1, 1 );
                    //i = i - 2; 
                    //j = j - 2;
                }
            }
            for ( z = leaders_key.length - 1; z >= 0; z--) {
                leader = Global_Data.leaders[ leaders_key[ z ] ]
                if (Utils.hit_test_bullet( leader , Global_Data.bullets[i] ) && //碰撞了
                      !Team.is_same_team (leader.guid, Global_Data.bullets[i].lead_guid ) ){//非同组子弹
                      //leader.guid !==  Global_Data.bullets[i].lead_guid) { //非自己的子弹
                    if ( --leader.HP === 0) {
                        remove_bullets_total = 0
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
                                Global_Data.bullets.splice(x,1);
                            }
                            Global_Data.bullets[i]
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
    draw_bullet: function() {
        //console.log(Global_Data.bullets);
        Global_Data.bullets.forEach(function (element) {
            switch (element.type) {
                case 'CIRCULAR_MOTION': //匀速圆周
                    ctx.beginPath();
                    ctx.fillStyle = element.color;
                    //ctx.fillStyle = 'white';
                    element.x = element.circle.x + Math.cos(element.circle.angle) * element.circle.radius
                    element.y = element.circle.y + Math.sin(element.circle.angle) * element.circle.radius
                    element.circle.angle += element.speed
                    ctx.arc(element.x , element.y, element.radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 'SPIRAL': //螺旋
                    var RADIUS_INC = 2; //设置每次增加的半径
                    ctx.beginPath();
                    ctx.fillStyle = element.color;
                    //ctx.fillStyle = 'yellow';
                    element.x = element.circle.x + Math.cos(element.circle.angle) * element.circle.radius;
                    element.y = element.circle.y + Math.sin(element.circle.angle) * element.circle.radius;
                    element.circle.angle +=element.speed;
                    element.circle.radius += RADIUS_INC;
                    ctx.arc(element.x , element.y, element.radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    break;
                case 'BEZIER': //贝塞尔  
                    var p1 = {x: element.circle.x, y: element.circle.y }; //起点
                    var p2 = {x: 0, y: 0};  //贝塞尔点1
                    var p3 = {x: base_1.width, y: base_1.height}; //贝塞尔点2
                    var p4 = {x: base_1.width, y: 0 }; //终点
                    
                    var cx = 3 * (p2.x - p1.x),
                        bx = 3 * (p3.x - p2.x) - cx,
                        ax = p4.x - p1.x - cx - bx,
                        cy = 3 * (p2.y -p1.y),
                        by = 3 * (p3.y - p2.y) - cy,
                        ay = p4.y - p1.y - cy -by,
                        t = element.t,
                        xt = ax*(t*t*t) + bx*(t*t) + cx*t + p1.x,
                        yt = ay*(t*t*t) + by*(t*t) + cy*t + p1.y;
                    element.x = xt;
                    element.y = yt;
                    //console.log(xt);
                    //console.log(yt);
                    if(element.t<=1)
                        element.t += element.bezier_speed;     
                    ctx.beginPath();
                    ctx.fillStyle = element.color;
                    //ctx.fillStyle = 'red';
                    ctx.arc(element.x , element.y, element.radius, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();  
                    break;  
            }
        })
    },
    /**
     * 发射子弹
     */
    send: function(){

        var guids = Object.keys(Global_Data.leaders),
            guid,
            i;

        for ( i = guids.length - 1; i >= 0; i--) {

            guid = guids[i];

            if (Global_Data.leaders[guid] === null) continue;
            if( Global_Data.key_press[guid][74] === true) {
                Bullets.send_bullet( Bullets.TYPE[0], guid);
                //Global_Data.bullets.push(new Bullet('CIRCULAR_MOTION', guid));
                //Music.play('bullet');
            } else if( Global_Data.key_press[guid][75] === true) {
                Bullets.send_bullet( Bullets.TYPE[1], guid);
                //Global_Data.bullets.push(new Bullet('SPIRAL', guid));
                //Music.play('bullet');
            } else if( Global_Data.key_press[guid][76] === true) {
                Bullets.send_bullet( Bullets.TYPE[2], guid);
                //Global_Data.bullets.push(new Bullet('BEZIER', guid));
                //Music.play('bullet');
            } 
        }
    },
    send_bullet: function(type, guid){
        Global_Data.bullets.push(new Bullet(type, guid));
        //Music.play('bullet');
    },
    draw_screen: function(){
        this.send();
        this.draw_bullet();
        this.remove_hit_bullets();
    },
}

var Bullet = function(type, lead_guid){
    /**
     * 球的主任
     */
    this.lead_guid = lead_guid,
    /**
     * 球的颜色
     */
    this.color = Team.get_team_color( lead_guid ),
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
        radius_inc: 2,
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
}