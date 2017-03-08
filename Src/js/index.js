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

import '../css/index.scss'



var computer_index = Utils.get_url_param( 'computer_index' ),
    game_array = [null, game_1, game_2, game_3, game_4, game_5],
    pk = Utils.get_url_param( 'pk' ),
    leader


//clear_base_1();

/**
 * 注册键盘监听事件
 */

Utils.set_aop();

page_init();


function page_init(){
    Key_Press.init();
    _canvas.init()
    leader = new Leader({
        guid: Global_Data.guid,
        team_id: 0
    });
    check_computer();
    renderer_game_num( game_array );
    bin_event();
    //Web_Pk.init(); //暂时去掉webpk
   // Web_Pk.send('get_all_leader' )//暂时去掉webpk
    //new Computer();
}

/**
 * 初始化电脑
 */
function check_computer(){
    if ( !game_array [ computer_index ] ) return;
    
    game_array[ computer_index ].init();
}

/**
 * 渲染管卡按钮
 */
function renderer_game_num( game_array) {

    var j_game_num_select = document.querySelector('.j_game_num_select'),
        buttom_array_string = ''

    if ( !game_array instanceof Array ) return
    if ( !j_game_num_select ) return

    Utils.each(game_array, function(element, index){
        if ( !element ) return

        buttom_array_string += `<a href="?computer_index=${index}"><button >关卡${index}</button></a>`
    })
    j_game_num_select.innerHTML += buttom_array_string
}

function bin_event(){
    var j_game_num_select_class_value =  document.querySelector('.j_game_num_select').classList.value,
        is_hidden
    document.querySelector('.j_select_game').onclick = function(){
        is_hidden = document.querySelector('.j_game_num_select').classList.value.indexOf('hidden') !== -1
        if ( is_hidden ) {
            document.querySelector('.j_game_num_select').classList.value = document.querySelector('.j_game_num_select').classList.value.replace('hidden','')
        }else {
            document.querySelector('.j_game_num_select').classList.value += ' hidden'
            
        }
    }
    document.querySelector('.j_select_tips').onclick = function(){
        alert('方向键: w(上) s(下) a(左) d(右) \n \
            子弹选择: \n \
                  j: 匀速圆周运动 \n \
                  k: 螺旋允许圆周运动 \n \
                  l: 贝塞尔运动');
     }
}

function check_pk(){
    if ( !pk ) return;

}

/**
 * 清除画布
 */



