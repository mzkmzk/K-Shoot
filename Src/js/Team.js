var Team = {
    join_team: function(guid, team_id){
        if ( Global_Data.teams[team_id] ) {
            Global_Data.teams[team_id].leaders.push( guid );
        }else {
            Global_Data.teams[team_id] = {};
            Global_Data.teams[team_id].color = COLOR.splice( Utils.get_random_int(0, COLOR.length - 1 ), 1  )[0];
            Global_Data.teams[team_id].leaders = [ guid ];  
        }
        return Global_Data.teams[team_id]
    },
    get_team_color: function( guid ) {
        var team = Global_Data.teams.find(function(element){
            if ( element.leaders.indexOf( guid ) !== -1) return true;
        })
        return team ? team.color : '';
    },
    is_same_team: function(guid_1, guid_2){
        var guid_1_team_index,
            guid_2_team_index;
        for (var i = Global_Data.teams.length - 1; i >= 0; i--) {
            guid_1_team_index = Global_Data.teams[i].leaders.indexOf( guid_1 );
            guid_2_team_index = Global_Data.teams[i].leaders.indexOf( guid_2 );
            if ( guid_1_team_index !== -1 &&  guid_2_team_index !== -1 ) return true;
        }
        return false;
    }
}