var Utils = {
    /**
     * 检测两个小球是否碰撞
     */
    hit_test_bullet: function( bullet_1, bullet_2 ){
        //if ( !(bullet_1 && bullet_2 && bullet_1.x && bullet_1.y && bullet_2.x && bullet_1.y) ) return false;
        var dx = bullet_1.x - bullet_2.x,
            dy = bullet_1.y - bullet_2.y,
            //原点之间距离
            real_distance = ( dx * dx ) + ( dy * dy ), 
            //碰撞的距离 = 两圆半径和
            hit_distance = ( bullet_1.radius + bullet_2.radius ) * ( bullet_1.radius + bullet_2.radius );
        return real_distance <= hit_distance;
    }
}