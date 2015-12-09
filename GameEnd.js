
//Defines main state
var mainStateEnd = {
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        game.load.spritesheet('button', 'assests/images/title button.png', 105, 36);
        game.load.image('background',"assests/images/ending.png");
        
     
    },
    

    //function that's called after the preload function
    //where we setup the basics of the game by displaying sprites etc
    create: function() {
        
        game.add.sprite(0,0,'background');
        this.button = game.add.button(260, 400, 'button', this.actionOnClick, this, 1, 0, 1);
        
    
    },
    actionOnClick: function() {
        game.state.start('main0');
    }
};

//initializes Phaser and starts the main state

