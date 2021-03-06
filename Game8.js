var position8 = 0;
var flag8 = false;
var onL8 = true;
var textbox8;
var startA = false;
var text8;
var key8 = false;
var event8 = true;
var eventTexts
var eventTS = false;
var eventTS2 = true;
var eventText;
this.door = null;
var textStart8;

function removeText() {

    text.destroy();

}

function checkOverlap(spriteA, spriteB) {

    var boundsA = spriteA.getBounds();
    var boundsB = spriteB.getBounds();

    return Phaser.Rectangle.intersects(boundsA, boundsB);

}

//Defines main state
var mainState8 = {
    
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        
        //loads the sprite sprite
        game.load.spritesheet('sprite', 'assests/images/Horror game character sprite sheet.png', 32, 48);
        game.load.image('woodFloor','assests/images/Tile map material/WoodFloor 2.png' );
        game.load.image('TheWall','assests/images/Tile map material/The wall.png' );
        game.load.image('TheWall2','assests/images/Tile map material/The wall 2.png' );
        game.load.image('TheWall3','assests/images/Tile map material/The wall 3.png' );
        game.load.image('TheWall4','assests/images/Tile map material/The wall 4.png' );
        game.load.image('TheWall5','assests/images/Tile map material/The wall 5.png' );
        game.load.image('TheWall6','assests/images/Tile map material/The wall 6.png' );
        game.load.image('bed','assests/images/Tile map material/bed 2.png' );
        game.load.image('bookShell','assests/images/Tile map material/book shell.png' );
        game.load.image('wall','assests/images/Tile map material/white wall.png' );
        game.load.image('HistopalFloor','assests/images/Tile map material/Histopal floor.png');
        game.load.image('flower','assests/images/Tile map material/desk2.png');
        game.load.image('bedBlock','assests/images/Tile map material/bed block.png');
        game.load.image('wall1','assests/images/Tile map material/wall7.png' );
        game.load.image('wall2','assests/images/Tile map material/wall6.png' );
        game.load.image('wall3','assests/images/Tile map material/wall5.png' );
        game.load.image('carpat','assests/images/Tile map material/carpat.png');
        game.load.image('doll','assests/images/Tile map material/doll.png');
        game.load.image('pinao','assests/images/Tile map material/pinao.png');
        game.load.image('bear','assests/images/Tile map material/bear1.png');
        game.load.image('bear2','assests/images/Tile map material/bear2.png');
        game.load.image('bear3','assests/images/Tile map material/bear3.png');
        game.load.image('sign','assests/images/sign.png');
        game.load.image('textbox','assests/images/TextBox.png');
    },
    

    //function that's called after the preload function
    //where we setup the basics of the game by displaying sprites etc
    create: function() {
        
        var a = this.input.keyboard.addKey(Phaser.Keyboard.A);
        a.onDown.add(this.changeText, this);
        
        game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
        
        
        
        //initializes physics system for the game
        game.physics.startSystem(Phaser.Physics.ARCADE);
        
        //creates a group that will contain all the bricks
        this.collideWith = game.add.group();
        
        //desc
        this.collideWith.enableBody = true;
        
        this.room = [
            [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 11, 2, 3, 1, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [4, 7, 7, 7, 7, 7, 1, 1, 7, 7, 7, 7, 6, 9],
            [9, 9, 9, 9, 9, 9, 10, 10, 9, 9, 9, 9, 9, 9]
           
        ];
        
        for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 1) {
                        game.add.sprite(i*32+80,j*32+32,'HistopalFloor');
                    } else if (this.room[i][j] === 0){
                       game.add.sprite(i*32+80,j*32+32,'TheWall', 0, this.collideWith);
                    } else if (this.room[i][j] === 2){
                        game.add.sprite(i*32+80,j*32+32,'wall3',0,this.collideWith)
                    } else if (this.room[i][j] === 4) {
                        game.add.sprite(i*32+80,j*32+32,'TheWall4', 0, this.collideWith);
                    } else if (this.room[i][j] === 5) {
                        game.add.sprite(i*32+80,j*32+32,'TheWall3', 0, this.collideWith);
                    } else if (this.room[i][j] === 6) {
                        game.add.sprite(i*32+80,j*32+32,'TheWall2', 0, this.collideWith);
                    } else if (this.room[i][j] === 7) {
                        game.add.sprite(i*32+80,j*32+32,'TheWall5', 0, this.collideWith);
                    } else if (this.room[i][j] === 8) {
                        game.add.sprite(i*32+80,j*32+32,'TheWall6', 0, this.collideWith);
                    } else if (this.room[i][j] === 10) {
                        this.door = game.add.sprite(i*32+80,j*32+32,'wall', this.collideWith);
                        this.door.visible = false;
                    } else if (this.room[i][j] === 3) {
                        game.add.sprite(i*32+80,j*32+32,'wall2');
                    } else if (this.room[i][j] === 11) {
                        game.add.sprite(i*32+80,j*32+32,'wall1');
                    }
                
                }
            
            }
        
        game.physics.arcade.enable(this.door);
        
         this.collideWith2 = game.add.group();
        
        //desc
        this.collideWith2.enableBody = true;
        


        this.roomMaterial = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
         
         for (var i=0; i<this.roomMaterial.length; i++) {
                for (var j = 0; j<this.roomMaterial[i].length; j++) {
                    if (this.roomMaterial[i][j] === 1) {
                        this.pinao = game.add.sprite(i*51.15-35,j*68-60,'pinao');
                        this.pinao.scale.x = 2;
                        this.pinao.scale.y = 2;
                    } else if (this.roomMaterial[i][j] === 2) {
                        this.carpat = game.add.sprite(i*32-102,j*32+44,'carpat');
                        this.carpat.scale.x = 3;
                        this.carpat.scale.y = 2.5;
                    } else if (this.roomMaterial[i][j] === 3) {
                        game.add.sprite(i*32+50,j*32,'bear',0,this.collideWith2);
                    } else if (this.roomMaterial[i][j] === 5) {
                        game.add.sprite(i*32+50,j*32,'bear3',0,this.collideWith2);
                    }
                }
            
            }
        
         this.blockMe = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
         
         for (var i=0; i<this.blockMe.length; i++) {
                for (var j = 0; j<this.blockMe[i].length; j++) {
                    if (this.blockMe[i][j] === 1) {
                        this.pinaoB = game.add.sprite(i*51.15-35,j*68-110,'pinao',0,this.collideWith2);
                        this.pinaoB.scale.x = 2;
                        this.pinaoB.scale.y = 2;
                        this.pinaoB.visible = false;
                    } else if (this.blockMe[i][j] === 2) {
                        this.bearL = game.add.sprite(i*32+50,j*32,'wall');
                        this.bearL.visible = false;
                    }
                }
          }
        
        
        
        //make bricks immovable when hit
        this.collideWith.setAll('body.immovable', true);  
        this.collideWith2.setAll('body.immovable', true);  
        
        //creates the sprite
        this.sprite = game.add.sprite(530, 225, 'sprite',4);
        this.sign = game.add.sprite(520,190,'sign');
        this.bigBear = game.add.sprite(110,-1000,'bear3');
        this.bigBear.scale.x = 6;
        this.bigBear.scale.y = 6;
        
        game.time.events.add(Phaser.Timer.SECOND*0.5, this.signKill, this);
        game.time.events.add(Phaser.Timer.SECOND*0.65, this.animation8, this);
        game.time.events.add(Phaser.Timer.SECOND*1.8, this.textShow, this);
        
        //enables the physics system for the sprite
        game.physics.arcade.enable(this.sprite);
        game.physics.arcade.enable(this.bigBear);
        
        
        this.sprite.animations.add('walkDown', [1,2,3,0],8);
        this.sprite.animations.add('stopDown', [0]);
        this.sprite.animations.add('walkLeft', [5,6,7,4],8);
        this.sprite.animations.add('stopLeft', [4]);
        this.sprite.animations.add('walkRight', [9,10,11,8],8);
        this.sprite.animations.add('stopRight', [8]);
        this.sprite.animations.add('walkUp', [13,14,15,12],8);
        this.sprite.animations.add('stopUp', [12]);
        this.sprite.animations.add('lookAround',[12,0,4],3)
        
        
        //makes the sprite bouncy
        this.sprite.body.collideWorldBounds = true; 
        
        textbox8 = game.add.sprite(12,300,'textbox');
        textbox8.scale.x = 0.3;
        textbox8.scale.y = 0.2;
        textbox8.visible = false;;
        
        this.texts = ['I saw him get in!!','How come he just dispair!?'];
        this.pinaoText = ['Found a key, what is this for?']
        textStart8 = "Where is him!!?"
        textsDoor = ['It\'s the exit','but the door is locked'];
        eventText = "Wooow";
        eventTexts = ["This gaint bear almost kill me!","Who did this?"];
        var style = {font: '20px Arial', fill:'#FFFFFF', align: 'center'};
        text8 = game.add.text(50,320,'',style);
    
    },
    
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {

        if (startA) {
            if(this.sprite.x > 440) {
                this.sprite.x -= 1.5;
                this.sprite.animations.play('walkLeft');
            } 

        }
       
        
        if (this.bigBear.y > 200 && eventTS2) {
            
            this.bigBear.body.velocity.y = 0;
            this.sprite.x = 240;
            textbox8.visible = true;
            text8.text = eventText;
            eventTS = true;
            eventTS2 = false;
        }
        

        
        
        if (flag8) {
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
       } else {
            this.sprite.body.velocity.x = 0;
            this.sprite.body.velocity.y = 0;
       }
        //make the paddle and the sprite collidable with each other
        //game.physics.arcade.collide(this.paddle, this.sprite);
        
        //makes the sprite and the bricks collidable with each other
        //and calls the "hit" function when they collide
        game.physics.arcade.collide(this.sprite, this.collideWith);
        game.physics.arcade.collide(this.sprite, this.collideWith2);



        //game.physics.arcade.collide(this.sprite, this.collideWith,this.door1,null,this);
        game.physics.arcade.collide(this.sprite,this.door, this.door1);


        /*if (checkOverlap(this.sprite,this.bookShell)) {
            game.state.start('main2');
        } else {
            return;
        }*/
        
    },
    
    changeText: function() {
        if (!onL8) {    
            try {
                console.log("inside collide");
                text8.text = this.texts[position8++];
            } catch (err) {
                flag8 = true;
                onL8 = true;
                position8 = 0;
                text8.text = '';
                textbox8.visible = false;
                return;
            } 
        } else if (checkOverlap(this.sprite, this.bearL) && event8) {
            console.log("in")
            event8 = false;
            flag8 = false;
            game.plugins.screenShake.shake(100);
            if (this.bigBear.y < 200) {
                this.bigBear.body.velocity.y = 1000;
            }
            
            
        } else if (checkOverlap(this.sprite,this.pinao)) {
            console.log(key8);
            key8 = true;
            flag8 = false;
            textbox8.visible = true;
             try {
                console.log("inside collide");
                text8.text = this.pinaoText[position8++];
            } catch (err) {
                flag8 = true;
                position8 = 0;
                text8.text = '';
                textbox8.visible = false;
                return;
            } 
        } else if (eventTS) {
            try {
                console.log("inside collide");
                text8.text = eventTexts[position8++];
            } catch (err) {
                flag8 = true;
                position8 = 0;
                eventTS = false;
                text8.text = '';
                textbox8.visible = false;
                return;
            } 
        }
            
        
    },
    
   door1: function(sprite,door) {
       console.log(key8);
       if (key8) {
            console.log('in');
            game.state.start('main9');
       } else {
            game.state.start('main9D1');
       }
    },
    
    signKill: function() {
        this.sign.kill();
    },
    
    animation8: function() {
    console.log(startA);
       startA = true;
    },
    textShow: function() {
        
        textbox8.visible = true;
        text8.text = textStart8;
        onL8 = false;
        startA = false;
    }
    
};

//initializes Phaser and starts the main state