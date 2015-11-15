function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

//Defines main state
var mainState = {
    
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        
        //loads the sprite sprite
        game.load.spritesheet('sprite', 'assests/images/Horror game character sprite sheet.png', 32, 48);
        
        game.load.spritesheet('character', 'assests/images/Horror game character sprite sheet.png',32,48);
        game.load.image('woodFloor','assests/images/Tile map material/WoodFloor 2.png' );
        game.load.image('woodWall','assests/images/Tile map material/cover wall.png' );
        game.load.image('bed','assests/images/Tile map material/histopal bed 2.png' );
        game.load.image('bookShell','assests/images/Tile map material/book shell.png' );
        game.load.image('wall','assests/images/Tile map material/white wall.png' );
    },

    //function that's called after the preload function
    //where we setup the basics of the game by displaying sprites etc
    create: function() {
        //initializes physics system for the game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //creates a group that will contain all the bricks
        this.collideWith = game.add.group();
        
        //desc
        this.collideWith.enableBody = true;
        
        this.room = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];
        
        for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 1) {
                        game.add.sprite(i*32+160,j*32+64,'woodFloor');
                    } else if (this.room[i][j] === 0){
                       game.add.sprite(i*32+160,j*32+64,'woodWall', 0, this.collideWith);
                    } else {
                        game.add.sprite(i*32+160,j*32+64,'wall')
                    }
                
                }
            
            }

        this.roomMaterial = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
         
         for (var i=0; i<this.roomMaterial.length; i++) {
                for (var j = 0; j<this.roomMaterial[i].length; j++) {
                    if (this.roomMaterial[i][j] === 1) {
                       this.bookShell = game.add.sprite(i*32+160,j*32+64,'bookShell');
                    } else if (this.roomMaterial[i][j] === 2) {
                        this.bed = game.add.sprite(i*32+160,j*32+64,'bed')
                    }
                
                }
            
            }
        
        //make bricks immovable when hit
        this.collideWith.setAll('body.immovable', true);  
        
        //creates the sprite
        this.sprite = game.add.sprite(224, 192, 'sprite');
        
        //enables the physics system for the sprite
        game.physics.arcade.enable(this.sprite);
        
        this.sprite.animations.add('walkDown', [1,2,3,0],8);
        this.sprite.animations.add('stopDown', [0]);
        this.sprite.animations.add('walkLeft', [5,6,7,4],8);
        this.sprite.animations.add('stopLeft', [4]);
        this.sprite.animations.add('walkRight', [9,10,11,8],8);
        this.sprite.animations.add('stopRight', [8]);
        this.sprite.animations.add('walkUp', [13,14,15,12],8);
        this.sprite.animations.add('stopUp', [12]);
        
        //makes the sprite bouncy
        this.sprite.body.collideWorldBounds = true;
    
    },
    
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.animations.play('walkLeft'); 
            this.sprite.body.velocity.x = -50;
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.animations.play('walkRight');
            this.sprite.body.velocity.x = 50;

        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.animations.play('walkUp');
            this.sprite.body.velocity.y = -50;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.animations.play('walkDown');
            this.sprite.body.velocity.y = 50;
        } else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
        
        //make the paddle and the sprite collidable with each other
        game.physics.arcade.collide(this.paddle, this.sprite);
        
        //makes the sprite and the bricks collidable with each other
        //and calls the "hit" function when they collide
        game.physics.arcade.collide(this.sprite, this.collideWith);
        

        if (checkOverlap(this.sprite,this.bookShell)) {
            game.state.start('main2');
        } else {
            return;
        }
    }
    
};

//initializes Phaser and starts the main state

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);
game.state.add('main2',mainState2);
game.state.start('main');