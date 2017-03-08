import Utils from './Utils'

window.Global_Data = {
    guid: Utils.get_guid(),
    leaders: {},
    teams: [
        
    ],
    bullets: [],
    key_press: {},
    computer_index: 0,
    loop_game: function(){
         //console.log('Global_Data.loop_game')
    }
}

export default window.Global_Data