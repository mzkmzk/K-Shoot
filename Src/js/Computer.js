var ACTION = [
    //'more_left',
    'more_right',
    //'more_up',
    'more_down'
]


var Computer = function(leader_config, computer_config){
    if ( !(this instanceof Computer) ) return new Computer(leader_config, computer_config)

    var lead = new Lead({
            guid: 'computer_'+Global_Data.computer_index,
            team_id: 1
        }),
        guid = lead.guid

    Global_Data.computer_index++
    console.log(lead)
    //自动移动
    var move_interval = setInterval(function(){
        if ( !Global_Data.leaders[guid] ) {
            clearInterval( move_interval ) 
            return;
        }
        var action_num  = Utils.get_random_int(0, ACTION.length - 1 );
        lead[ACTION[action_num]]() * 1000
    },1000/40)

    //自动发子弹
     var bullet_interval = setInterval(function(){
        if ( !Global_Data.leaders[guid] ) {
            clearInterval( bullet_interval )
            return;
        }
        var bullet_action_num  = Utils.get_random_int(0, Bullets.TYPE.length - 1 );
        Bullets.send_bullet( Bullets.TYPE[bullet_action_num], lead.guid)
        
    },1000/4)
}