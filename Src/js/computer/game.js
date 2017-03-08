import Computer from './Computer'

var Game = function(game_config){
    this.computer_array = game_config.computer_array || [];
}

Game.prototype.init = function(){
    for (var i = this.computer_array.length - 1; i >= 0; i--) {
        new Computer(this.computer_array[i])
    }
}

export default Game