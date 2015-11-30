var position = 0;
this.door = null;

function removeText() {

    text.destroy();

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

//Defines main state
var mainState10 = {
    
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        
        //loads the sprite sprite
        game.load.spritesheet('sprite', 'assests/images/Horror game character sprite sheet.png', 32, 48);
        game.load.image('woodFloor','assests/images/Tile map material/WoodFloor 2.png' );
        game.load.image('TheWall2','assests/images/Tile map material/cover wall.png' );
        game.load.image('bed','assests/images/Tile map material/bed 2.png' );
        game.load.image('wall','assests/images/Tile map material/white wall.png' );
        game.load.image('HistopalFloor','assests/images/Tile map material/Histopal floor.png');
        game.load.image('flower','assests/images/Tile map material/desk2.png');
        game.load.image('HistopalShell','assests/images/Tile map material/histopal shell.png');
        game.load.image('bedBlock','assests/images/Tile map material/bed block.png');
        game.load.image('wall1','assests/images/Tile map material/wall7.png' );
        game.load.image('wall2','assests/images/Tile map material/wall6.png' );
        game.load.image('wall3','assests/images/Tile map material/wall5.png' );
        game.load.image('carpat','assests/images/Tile map material/carpat2.png' );
        game.load.image('book shell','assests/images/Tile map material/BookShell 2.png' );
        game.load.image('book shell2','assests/images/Tile map material/BookShell 1.png' );
        game.load.image('clock','assests/images/Tile map material/clock.png' );
        game.load.image('drawing','assests/images/Tile map material/drawing 1.png' );
        game.load.image('drawing2','assests/images/Tile map material/drawing 2.png' );
        game.load.image('desk','assests/images/Tile map material/officie desk.png' );
        game.load.image('flower','assests/images/Tile map material/flower 2.png' );
        
        
    },
    

    //function that's called after the preload function
    //where we setup the basics of the game by displaying sprites etc
    create: function() {
        
        var a = this.input.keyboard.addKey(Phaser.Keyboard.A);
        a.onDown.add(this.changeText, this);

        //initializes physics system for the game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //creates a group that will contain all the bricks
        this.collideWith = game.add.group();
        
        //desc
        this.collideWith.enableBody = true;
        
        this.collideDoor = game.add.group();
        
        //desc
        this.collideDoor.enableBody = true;
        
        this.room = [
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 4, 9],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 4, 9],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 4, 9],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 1, 11],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 1, 11],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 1, 11],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 4, 9],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 4, 9],
            [4, 3, 10, 2, 1, 1, 1, 1, 1, 1, 1, 4, 9],
            [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 9],
            [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9]
           
        ];
        
        for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 1) {
                        game.add.sprite(i*32+144,j*32+48,'woodFloor');
                    } else if (this.room[i][j] === 2){
                        game.add.sprite(i*32+144,j*32+48,'wall2')
                    } else if (this.room[i][j] === 3){
                        game.add.sprite(i*32+144,j*32+48,'wall1')
                    } else if (this.room[i][j] === 4) {
                        game.add.sprite(i*32+144,j*32+48,'TheWall2', 0, this.collideWith);
                    } else if (this.room[i][j] === 11) {
                        this.door = game.add.sprite(i*32+144,j*32+48,'wall', 0,this.collideDoor);
                        this.door.visible = false;
                    } else if (this.room[i][j] === 10){
                        game.add.sprite(i*32+144,j*32+48,'wall3',0,this.collideWith);
                    }
                
                }
            
            }
        
 


        this.roomMaterial = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
         
         for (var i=0; i<this.roomMaterial.length; i++) {
                for (var j = 0; j<this.roomMaterial[i].length; j++) {
                    if (this.roomMaterial[i][j] === 1) {
                        this.carpat = game.add.sprite(i*32+130,j*32+48,'carpat');
                        this.carpat.scale.x = 3;
                        this.carpat.scale.y = 2;
                    } else if (this.roomMaterial[i][j] === 2) {
                        this.shell = game.add.sprite(i*32+79,j*32+32,'book shell');
                    } else if (this.roomMaterial[i][j] === 3) {
                        this.shell2 = game.add.sprite(i*32+143,j*32+32,'book shell');
                    } else if (this.roomMaterial[i][j] === 4) {
                        this.desk = game.add.sprite(i*32+112,j*32,'desk');
                        this.desk.scale.x = 1.5;
                        this.desk.scale.y = 1.5;
                        
                    }
                }
            
            }
        
         this.blockMe = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
         
         for (var i=0; i<this.blockMe.length; i++) {
                for (var j = 0; j<this.blockMe[i].length; j++) {
                    if (this.blockMe[i][j] === 1) {
                        this.deskB = game.add.sprite(i*32+120,j*32-50,'desk',0,this.collideWith);
                        this.deskB.scale.x = 1.2;
                        this.deskB.scale.y = 1.5;
                        this.deskB.visible = false;
                    }
                }
          }
        
        
        
        //make bricks immovable when hit
        this.collideWith.setAll('body.immovable', true);  
        this.collideDoor.setAll('body.immovable', true);  
        
        //creates the sprite
        this.sprite = game.add.sprite(306, 383, 'sprite',12);
        
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
        
        this.texts = ['aaaaaa','bbbbbbb','cccccc'];
        var style = {font: '20px Arial', fill:'#FFFFFF', align: 'center'};
        this.text1 = game.add.text(0,0,"",style);
        
        
        //makes the sprite bouncy
        this.sprite.body.collideWorldBounds = true; 
    
    },
    
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.animations.play('walkLeft'); 
            this.sprite.body.velocity.x = -100;
            this.sprite.body.velocity.y = 0;
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.animations.play('walkRight');
            this.sprite.body.velocity.x = 100;
            this.sprite.body.velocity.y = 0;

        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.animations.play('walkUp');
            this.sprite.body.velocity.y = -100;
            this.sprite.body.velocity.x = 0;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.animations.play('walkDown');
            this.sprite.body.velocity.y = 100;
            this.sprite.body.velocity.x = 0;
        }
        else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
        }
            
        //make the paddle and the sprite collidable with each other
        //game.physics.arcade.collide(this.paddle, this.sprite);
        
        //makes the sprite and the bricks collidable with each other
        //and calls the "hit" function when they collide
        game.physics.arcade.collide(this.sprite, this.collideWith);

        game.physics.arcade.collide(this.sprite, this.door,this.door1,null,this);

        //game.physics.arcade.collide(this.sprite, this.collideWith,this.door1,null,this);
        game.physics.arcade.collide(this.sprite,this.collideDoor, this.door1);



        /*if (checkOverlap(this.sprite,this.bookShell)) {
            game.state.start('main2');
        } else {
            return;
        }*/
        
    },
    
    changeText: function() {
        try {
            console.log("inside collide");
            this.text1.text = this.texts[position++];
            } catch (err) {
                return;
            }
    },
    
   door1: function(sprite,door) {
       console.log('in');
        game.state.start('main11');
    }
    
};

//initializes Phaser and starts the main state