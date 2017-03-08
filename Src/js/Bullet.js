import Team from './Team'
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

export default Bullet