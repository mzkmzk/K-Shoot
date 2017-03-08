import Global_Data from './Global_Data'
import Utils from './Utils'
import Key_Press from './Key_Press'
import Leader from './Leader'
import _canvas from './_canvas'

import game_1 from './computer/game_1'
import game_2 from './computer/game_2'
import game_3 from './computer/game_3'
import game_4 from './computer/game_4'
import game_5 from './computer/game_5'



var computer_index = Utils.get_url_param( 'computer_index' ),
    game_array = [, game_1, game_2, game_3, game_4, game_5],
    pk = Utils.get_url_param( 'pk' ),
    leader


//clear_base_1();

/**
 * 注册键盘监听事件
 */
Key_Press.init();
Utils.set_aop();

page_init();
check_computer();



function page_init(){
    _canvas.init()
    leader = new Leader({
        guid: Global_Data.guid,
        team_id: 0
    });
    
    //Web_Pk.init(); //暂时去掉webpk
   // Web_Pk.send('get_all_leader' )//暂时去掉webpk
    //new Computer();
}

function check_computer(){
    if ( !computer_index ) return;
;

    game_array[ computer_index ].init();
}

function check_pk(){
    if ( !pk ) return;

}

/**
 * 清除画布
 */



