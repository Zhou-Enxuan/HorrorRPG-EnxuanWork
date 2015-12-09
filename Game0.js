
//Defines main state
var mainState0 = {
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        game.load.spritesheet('button', 'assests/images/start.png', 128, 58);
        game.load.image('background', 'assests/images/title screen.png', 128, 58);
        
     
    },
    

    //function that's called after the preload function
    //where we setup the basics of the game by displaying sprites etc
    create: function() {
        
        game.add.sprite(0,0,'background')
        this.button = game.add.button(260, 400, 'button', this.actionOnClick, this, 1, 0, 1);
        
     
    
    },
    actionOnClick: function() {
        game.state.start('main');
    }
    
};

//initializes Phaser and starts the main state

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('main0', mainState0);
game.state.add('main', mainState);
game.state.add('main2',mainState2);
game.state.add('main2D1',mainState2D1);
game.state.add('main3',mainState3);
game.state.add('main4',mainState4);
game.state.add('main4D1',mainState4D1);
game.state.add('main5',mainState5);
game.state.add('main6',mainState6);
game.state.add('main7',mainState7);
game.state.add('main8',mainState8);
game.state.add('main8D1',mainState8D1);
game.state.add('main8D2',mainState8D2);
game.state.add('main9',mainState9);
game.state.add('main9D1',mainState9D1);
game.state.add('main10',mainState10);
game.state.add('main11',mainState11);
game.state.add('main11D1',mainState11D1);
game.state.add('mainEnd',mainStateEnd);
game.state.start('main0');
