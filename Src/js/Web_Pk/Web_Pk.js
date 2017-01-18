//var WEB_PK_ACTION = {

//}
var Web_Pk = {
    /**
     * 初始化record
     */
    record: null,
    WEBSOCKET_NAME: 'K-Shoot',
    WEBSOCKET_INFO_NAME: 'KEP_PRESS',
    get_client: function(){
        return window.deepstream('120.24.37.206:6020').login()
    },
    get_record: function(){
        return Web_Pk.record ||  Web_Pk.get_client().record.getRecord(Web_Pk.WEBSOCKET_NAME)
    },
    send_leader: function(){
        return  Web_Pk.send('leader_init', { leader_config: Global_Data.leaders[Global_Data.guid].arguments[0] } )
    },
    send: function(action, data){
        Web_Pk.get_record().set('subscribeJS', JSON.stringify({
            guid: Global_Data.guid,
            action: action,
            data: data
        }));
        console.log('send'+JSON.stringify({
            guid: Global_Data.guid,
            action: action,
            data: data
        }))
    },
    /**
     * 同步信息 {guid, action, data}
     */ 
    subscribe: function(){
        Web_Pk.get_record().subscribe('subscribeJS', function(result){
            console.log('subscribe '+result);
            var result = JSON.parse(result),
                leader_config;

            if (result.action === 'key_press_up'){
                Global_Data.key_press[result.guid][result.data.key] = false;
            }else if (result.action === 'key_press_down'){
                Global_Data.key_press[result.guid][result.data.key] = true;
            }else if (result.action === 'leader_init'){
                result.data.leader_config.is_not_send = true
                leader_config = result.data.leader_config;
                new Leader(leader_config);
            }else if (result.action === 'get_all_leader'){
                Web_Pk.send('leader_init', { leader_config: Global_Data.leaders[Global_Data.guid].arguments[0] })
            }

            
        });
    },
    init: function(){
        Web_Pk.subscribe()
    }
}