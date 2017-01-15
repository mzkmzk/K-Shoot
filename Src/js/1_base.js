/**
 * Created by maizhikun on 16/6/1.
 */
var base_1 = document.getElementById('base_1');
base_1.width = document.body.scrollWidth;
base_1.height = document.body.scrollHeight;
var ctx = base_1.getContext('2d');
var computer_index = Utils.get_url_param( 'computer_index' ) ;

/**
 * 清除画布
 */
function clear_base_1 (){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, base_1.width, base_1.height); //还原掉上次的白色球
}

//clear_base_1();

/**
 * 注册键盘监听事件
 */
Key_Press.init();
Utils.set_aop();

page_init();
check_computer();
loop_game();


function page_init(){
    lead = new Lead({
        guid: Global_Data.guid,
        team_id: 0
    });
    //new Computer();
}

function check_computer(){
    if ( !computer_index ) return;
    
    window['game_'+computer_index].init();
}

function loop_game(){
    
    clear_base_1()
    Global_Data.loop_game()
    //lead.draw_screen()
    Bullets.draw_screen()
    window.setTimeout(loop_game, 1000/40);
}



