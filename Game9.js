var position = 0;
this.door = null;function removeText() {

    text.destroy();

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

//Defines main state
var mainState9 = {
    
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        
        //loads the sprite sprite
        game.load.spritesheet('sprite', 'assests/images/Horror game character sprite sheet.png', 32, 48);
        game.load.image('TheWall','assests/images/Tile map material/The wall.png' );
        game.load.image('TheWall2','assests/images/Tile map material/The wall 2.png' );
        game.load.image('TheWall3','assests/images/Tile map material/The wall 3.png' );
        game.load.image('TheWall4','assests/images/Tile map material/The wall 4.png' );
        game.load.image('TheWall5','assests/images/Tile map material/The wall 5.png' );
        game.load.image('TheWall6','assests/images/Tile map material/The wall 6.png' );
        game.load.image('wall','assests/images/Tile map material/white wall.png' );
        game.load.image('HistopalFloor','assests/images/Tile map material/Histopal floor.png');
        game.load.image('blood1','assests/images/Tile map material/Blood/Blood 1.png');
        game.load.image('blood2','assests/images/Tile map material/Blood/Blood 2.png');
        game.load.image('blood3','assests/images/Tile map material/Blood/Blood 3.png');
        game.load.image('Body1','assests/images/Tile map material/Dead Body/Dead Body 1.png')
        game.load.image('Body2','assests/images/Tile map material/Dead Body/Dead Body 2.png')
        game.load.image('Body3','assests/images/Tile map material/Dead Body/Dead Body 3.png')
        game.load.image('Body4','assests/images/Tile map material/Dead Body/Dead Body 4.png')
        game.load.image('Bed','assests/images/Tile map material/histopal bed 2.png' );
        game.load.image('Bag','assests/images/Tile map material/hsitopal bag 2.png' );
        game.load.image('wall5','assests/images/Tile map material/wall5.png' );
        game.load.image('wall6','assests/images/Tile map material/wall6.png' );
        game.load.image('wall7','assests/images/Tile map material/wall7.png' );
        game.load.image('desk','assests/images/Tile map material/desk tile.png' );
        game.load.image('desk2','assests/images/Tile map material/desk tile 2.png' );
        game.load.image('desk3','assests/images/Tile map material/desk tile 3.png' );
        game.load.image('bedBlock','assests/images/Tile map material/bed block 2.png' );
        game.load.image('showdow1','assests/images/Tile map material/showdow 1.png' );
        game.load.image('showdow2','assests/images/Tile map material/showdow 2.png' );
        game.load.image('showdow3','assests/images/Tile map material/showdow 3.png' );
        game.load.image('showdow4','assests/images/Tile map material/showdow 4.png' );
        
        
        
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
        
        this.room = [
            [2,2,2,2,2,2,3,4,2,2,2,2,2,2,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
           
        ];
        
        for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 0) {
                        game.add.sprite(i*32+210,j*32,'HistopalFloor');
                    } else if (this.room[i][j] === 2) {
                        game.add.sprite(i*32+210,j*32,'TheWall5', 0, this.collideWith);
                    } else if (this.room[i][j] === 3) {
                        game.add.sprite(i*32+210,j*32,'showdow3');
                
                    } else if (this.room[i][j] === 4) {
                        game.add.sprite(i*32+210,j*32,'showdow4');
                    }
                }
            }
        
        this.collideWith2 = game.add.group();
        this.collideWith2.enableBody = true;
  


        /*this.roomMaterial = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,5,0,0,0,0,3,0,0,0,0,0,0],
            [0,0,0,6,0,2,0,0,0,0,0,0,2,0,0],
            [0,0,0,0,0,0,0,4,0,0,0,2,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,5,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,6,0,0,0,0,0,0,0,0,3,0,0],
            [0,0,0,0,4,0,1,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,5,0,0,0,0,0,3,0,0,0,0,0],
            [0,0,0,6,0,0,0,0,0,0,0,0,0,2,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,3,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,5,0,0,0,0,1,0,0,2,0,0,0],
            [0,0,0,6,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,3,0,4,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,5,1,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,6,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        ]
        
        
         
         for (var i=0; i<this.roomMaterial.length; i++) {
                for (var j = 0; j<this.roomMaterial[i].length; j++) {
                    if (this.roomMaterial[i][j] === 1) {
                     game.add.sprite(i*32,j*32,'Body1', 0, this.collideWith2);
                   } else if (this.roomMaterial[i][j] === 2) {
                        game.add.sprite(i*32,j*32,'Body2', 0, this.collideWith2);
                   } else if (this.roomMaterial[i][j] === 3) {
                        game.add.sprite(i*32,j*32,'Body3', 0, this.collideWith2);
                   }  else if (this.roomMaterial[i][j] === 4) {
                        game.add.sprite(i*32,j*32,'Body4', 0, this.collideWith2);
                   } else if (this.roomMaterial[i][j] === 5) {
                        game.add.sprite(i*32,j*32,'Bed');
                   }  else if (this.roomMaterial[i][j] === 6) {
                        game.add.sprite(i*32,j*32,'Bag');
                   } 
                }
            }*/
        
            this.collideWith3 = game.add.group();
            this.collideWith3.enableBody = true;
            this.collideWith4 = game.add.group();
            this.collideWith4.enableBody = true;
        
          this.blockMe = [
            [0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
            [2,0,0,0,0,0,0,0,0,0,0,0,0,0,3],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
              
        ]
         
         for (var i=0; i<this.blockMe.length; i++) {
                for (var j = 0; j<this.blockMe[i].length; j++) {
                     if (this.blockMe[i][j] === 1) {
                        this.door = game.add.sprite(i*32+180,j*32,'wall', this.collideWith2);
                        this.door.visible = false;
                    } else if (this.blockMe[i][j] === 2) {
                        this.door2 = game.add.sprite(i*32+210,j*32-28,'wall',0, this.collideWith3);
                        this.door2.visible = false;
                    } else if (this.blockMe[i][j] === 3) {
                        this.door3 = game.add.sprite(i*32+210,j*32+28,'wall',0, this.collideWith4);
                        this.door3.visible = false;
                    }
                }
          }
        
         game.physics.arcade.enable(this.door);

        
        
        
        
        //make bricks immovable when hit
        this.collideWith.setAll('body.immovable', true);  
        this.collideWith2.setAll('body.immovable', true);
        this.collideWith3.setAll('body.immovable', true);
        this.collideWith4.setAll('body.immovable', true);
        
        //creates the sprite
        this.sprite = game.add.sprite(210, 200, 'sprite',8);
        
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
        game.physics.arcade.collide(this.sprite, this.collideWith2);

        game.physics.arcade.collide(this.sprite,this.door, this.seNcondDoor);
        game.physics.arcade.collide(this.sprite,this.collideWith3, this.thirdDoor);
        game.physics.arcade.collide(this.sprite,this.collideWith4, this.door1);


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
        game.state.start('main7');
    },
    
    seNcondDoor: function(sprite,door) {
       console.log('in');
        game.state.start('main8D2');
    },
     thirdDoor: function(sprite,door) {
        console.log('in');
        game.state.start('main10');
     }
    
};
