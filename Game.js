var position = 0;
var key = false;
var flag = true;
var onL = true;
var textsDoor;
var text1;
this.door = null;function removeText() {

    text.destroy();

}
var textbox;

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
        game.load.image('HistopalShell','assests/images/Tile map material/histopal shell.png');
        game.load.image('bedBlock','assests/images/Tile map material/bed block.png');
        game.load.image('textbox','assests/images/TextBox.png');
        
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
        
        this.door2 = game.add.group();
        
        //desc
        this.door2.enableBody = true;

        
        
        this.room = [
            [0, 7, 7, 7, 7, 7, 7, 7, 7, 7, 5, 9],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 3, 8, 9],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 11],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 11],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [8, 2, 2, 1, 1, 1, 1, 1, 1, 1, 8, 9],
            [4, 7, 7, 7, 7, 1, 1, 7, 7, 7, 6, 9],
            [9, 9, 9, 9, 9, 10, 10, 9, 9, 9, 9, 9]
           
        ];
        
        
        
        for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 1) {
                        game.add.sprite(i*32+160,j*32+64,'HistopalFloor');
                    } else if (this.room[i][j] === 0){
                       game.add.sprite(i*32+160,j*32+64,'TheWall', 0, this.collideWith);
                    } else if (this.room[i][j] === 2){
                        game.add.sprite(i*32+160,j*32+64,'wall')
                    } else if (this.room[i][j] === 3){
                        this.doorKey = game.add.sprite(i*32+160,j*32+64,'HistopalFloor');
                    } else if (this.room[i][j] === 4) {
                        game.add.sprite(i*32+160,j*32+64,'TheWall4', 0, this.collideWith);
                    } else if (this.room[i][j] === 5) {
                        game.add.sprite(i*32+160,j*32+64,'TheWall3', 0, this.collideWith);
                    } else if (this.room[i][j] === 6) {
                        game.add.sprite(i*32+160,j*32+64,'TheWall2', 0, this.collideWith);
                    } else if (this.room[i][j] === 7) {
                        game.add.sprite(i*32+160,j*32+64,'TheWall5', 0, this.collideWith);
                    } else if (this.room[i][j] === 8) {
                        game.add.sprite(i*32+160,j*32+64,'TheWall6', 0, this.collideWith);
                    } else if (this.room[i][j] === 10) {
                        this.door = game.add.sprite(i*32+160,j*32+64,'wall', this.collideWith);
                        this.door.visible = false;
                    } else if (this.room[i][j] === 11) {
                        game.add.sprite(i*32+160,j*32+64,'wall', 0,this.door2);
                    }
                
                }
            
            }
        
        game.physics.arcade.enable(this.door);
        this.door2.visible = false;
        
        this.shells = game.add.group();
        this.shells.enableBody = true;


        this.roomMaterial = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
         
         for (var i=0; i<this.roomMaterial.length; i++) {
                for (var j = 0; j<this.roomMaterial[i].length; j++) {
                    if (this.roomMaterial[i][j] === 1) {
                       this.shell = game.add.sprite(i*51.15-12.5,j*68-10,'HistopalShell',0,this.shells);
                       this.shell.scale.x = 1.55;
                        this.shell.scale.y = 2;
                    } else if (this.roomMaterial[i][j] === 2) {
                        this.bed = game.add.sprite(i*32+137,j*32+64,'bed');
                        this.bed.scale.x = 1.3;
                        this.bed.scale.y = 1.3;
                    } else if (this.roomMaterial[i][j] === 3) {
                        game.add.sprite(i*32+160,j*32+68,'flower');
                    }
                }
            
            }
        
         this.blockMe = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 3, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 2, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ]
         
         for (var i=0; i<this.blockMe.length; i++) {
                for (var j = 0; j<this.blockMe[i].length; j++) {
                    if (this.blockMe[i][j] === 1) {
                        this.histopalShell = game.add.sprite(i*32+160,j*32+24,'wall',0,this.collideWith);
                    } else if (this.blockMe[i][j] === 2) {
                        this.bedB = game.add.sprite(i*32+143,j*32+64,'bedBlock',0,this.collideWith);

                    } else if (this.blockMe[i][j] === 3) {
                        this.bedB = game.add.sprite(i*32+160,j*32+68,'flower',0,this.collideWith);

                    }
                }
          }
        
        
        
        //make bricks immovable when hit
        this.collideWith.setAll('body.immovable', true);
        this.door2.setAll('body.immovable', true);
        
        
        //creates the sprite
        this.sprite = game.add.sprite(303, 253, 'sprite');
        
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
        textbox = game.add.sprite(12,300,'textbox');
        textbox.scale.x = 0.3;
        textbox.scale.y = 0.2;
        
        textbox.visible = false;
        
        this.texts = ['This is the key to the door!!!'];
        textsDoor = ['The door is locked','This key didn\'t fit the door'];
        var style = {font: '20px Arial', fill:'#FFFFFF', align: 'center'};
        this.shellText = ["All inside is medchine!!"];
        text1 = game.add.text(50,320,"",style);
        
    
    },
    
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
        
        if (flag) {
        
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
            
        }

        //make the paddle and the sprite collidable with each other
        //game.physics.arcade.collide(this.paddle, this.sprite);
        
        //makes the sprite and the bricks collidable with each other
        //and calls the "hit" function when they collide
        game.physics.arcade.collide(this.sprite, this.collideWith);

        game.physics.arcade.collide(this.sprite, this.door,this.door1,null,this);

        //game.physics.arcade.collide(this.sprite, this.collideWith,this.door1,null,this);
        game.physics.arcade.collide(this.sprite,this.door2, this.second);

        game.physics.arcade.collide(this.sprite,this.door, this.door1);

        
        
    },
    changeText: function() {
        
        if (checkOverlap(this.sprite,this.doorKey)) {
            flag = false;
            key = true;
            textbox.visible = true;
            try {
                console.log("inside collide");
                text1.text = this.texts[position++];
            } catch (err) {
                position = 0;
                flag = true;
                text1.text = '';
                textbox.visible = false;
                return;
            }
            
        } else if (checkOverlap(this.sprite,this.shells)) {
            flag = false;
            this.sprite.body.velocity.x = 0;
            textbox.visible = true;
            try {
                console.log(position);
                text1.text = this.shellText[position++];
            } catch (err) {
                console.log(position);
                position = 0;
                flag = true;
                text1.text = '';
                textbox.visible = false;
                return;
                
            }
            
        } else if (!onL) {
            flag = true;
            onL = true;
            text1.text = '';
            textbox.visible = false;
        } else {
            return;
        }
    },
    
    second: function(sprite, door) {
        if (!key) {
            
            console.log(textbox);
            textbox.visible = true;
            text1.text = textsDoor[0];
            onL = false;
            flag = false;
        } else {
            console.log(textbox);
            textbox.visible = true;
            text1.text = textsDoor[1];
            onL = false;
            flag = false;  
        }
    },
    
    door1: function(sprite,door) {
        console.log(textbox)
       if (key) {
            console.log('in');
            game.state.start('main2');
       } else {
           textbox.visible = true;
           text1.text = textsDoor[0];
           flag = false;
           onL = false;
           this.sprite.body.velocity.x = 0;
       }
    }
    
};

//initializes Phaser and starts the main state

var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

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
game.state.add('main9',mainState9);
game.state.add('main10',mainState10);
game.state.add('main11',mainState11);
game.state.start('main4');
