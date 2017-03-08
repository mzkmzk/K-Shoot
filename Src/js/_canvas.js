import Bullets from './Bullets'
var Canvas = {
    ctx: null,
    init: function(){
        var base_1 = document.getElementById('base_1'),
            ctx 

        base_1.width =  document.documentElement.clientWidth
        base_1.height =  document.documentElement.clientHeight 

        Canvas.ctx = base_1.getContext('2d');

        function clear_base_1 (){
            Canvas.ctx.fillStyle = "black";
            Canvas.ctx.fillRect(0, 0, base_1.width, base_1.height); //还原掉上次的白色球
        }
        loop_game();
        function loop_game(){
            
            clear_base_1()
            Global_Data.loop_game()
            //lead.draw_screen()
            Bullets.draw_screen()
            window.setTimeout(loop_game, 1000/40);
        }

    }
    
}

export default Canvas

