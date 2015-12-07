var position4 = 0;
var flag4 = false;
var onL4 = false;
var onLL4 = false;
var textbox4;
var texts4;
var textsDoor;
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
var mainState4 = {
    
    //function that executes at the beginning of the game
    //so we load our assets here
    preload: function() {
        
        //loads the sprite sprite
        game.load.spritesheet('sprite', 'assests/images/Horror game character sprite sheet.png', 32, 48);
        game.load.spritesheet('enemy', 'assests/images/Layer 2.png', 27, 32);
        game.load.spritesheet('door', 'assests/images/Tile map material/Door/Door 1.png',32,63);
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
         game.load.image('wall5','assests/images/Tile map material/wall5.png' );
        game.load.image('wall6','assests/images/Tile map material/wall6.png' );
        game.load.image('wall7','assests/images/Tile map material/wall7.png' );
        game.load.image('desk','assests/images/Tile map material/desk tile.png' );
        game.load.image('desk2','assests/images/Tile map material/desk tile 2.png' );
        game.load.image('desk3','assests/images/Tile map material/desk tile 3.png' );
        game.load.image('chair','assests/images/Tile map material/Chair up.png' );
        game.load.image('juice','assests/images/Tile map material/juice machine.png' );
        game.load.image('coffee','assests/images/Tile map material/coffee machine.png' );
        game.load.image('showdow1','assests/images/Tile map material/showdow 1.png' );
        game.load.image('showdow2','assests/images/Tile map material/showdow 2.png' );
        game.load.image('showdow3','assests/images/Tile map material/showdow 3.png' );
        game.load.image('showdow4','assests/images/Tile map material/showdow 4.png' );
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
        
        this.room = [
            [9,9,9,9,9,9,9,10,10,9,9,9,9,9,9,9],
            [9,1,7,7,7,7,7,15,16,7,7,7,7,7,7,5],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,13,13,13,13,0,0,0,0,0,0,0,0,0,0,8],
            [9,14,14,14,14,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,12,12,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,13],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,14],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,12,12,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,8,11,2,3,0,0,0,0,0,0,0,0,0,0,8],
            [9,4,7,7,7,7,7,7,7,7,7,7,7,7,7,6]
           
        ];
        
        for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 0) {
                        game.add.sprite(i*32-32,j*32-32,'HistopalFloor');
                    } else if (this.room[i][j] === 1){
                       game.add.sprite(i*32-32,j*32-32,'TheWall', 0, this.collideWith);
                    } else if (this.room[i][j] === 2){
                        game.add.sprite(i*32-32,j*32-32,'wall5',0,this.collideWith)
                    } else if (this.room[i][j] === 3){
                        game.add.sprite(i*32-32,j*32-32,'wall6')
                    } else if (this.room[i][j] === 4) {
                        game.add.sprite(i*32-32,j*32-32,'TheWall4', 0, this.collideWith);
                    } else if (this.room[i][j] === 5) {
                        game.add.sprite(i*32-32,j*32-32,'TheWall3', 0, this.collideWith);
                    } else if (this.room[i][j] === 6) {
                        game.add.sprite(i*32-32,j*32-32,'TheWall2', 0, this.collideWith);
                    } else if (this.room[i][j] === 7) {
                        game.add.sprite(i*32-32,j*32-32,'TheWall5', 0, this.collideWith);
                    } else if (this.room[i][j] === 8) {
                        game.add.sprite(i*32-32,j*32-32,'TheWall6', 0, this.collideWith);
                    } else if (this.room[i][j] === 10) {
                        this.door = game.add.sprite(i*32-20,j*32-32,'wall', this.collideWith);
                        //this.door.visible = false;
                    } else if (this.room[i][j] === 11){
                        game.add.sprite(i*32-32,j*32-32,'wall7')
                    }  else if (this.room[i][j] === 12){
                        game.add.sprite(i*32-32,j*32-32,'desk')
                    } else if (this.room[i][j] === 13){
                        game.add.sprite(i*32-32,j*32-32,'showdow1')
                    }  else if (this.room[i][j] === 14){
                        game.add.sprite(i*32-32,j*32-32,'showdow2')
                    } else if (this.room[i][j] === 15){
                        game.add.sprite(i*32-32,j*32-32,'showdow3')
                    } else if (this.room[i][j] === 16){
                        game.add.sprite(i*32-32,j*32-32,'showdow4')
                    }
                }
            
            }
        
        game.physics.arcade.enable(this.door);
        this.collideWith2 = game.add.group();
        this.collideWith2.enableBody = true;
  


        this.roomMaterial = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,3,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,2,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0],
            [0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            
            
        ]
        
        
         
         for (var i=0; i<this.roomMaterial.length; i++) {
                for (var j = 0; j<this.roomMaterial[i].length; j++) {
                    if (this.roomMaterial[i][j] === 1) {
                     game.add.sprite(i*32-55,j*32-24,'chair', 0, this.collideWith2);
                   }   else if (this.roomMaterial[i][j] === 2){
                        game.add.sprite(i*32-32,j*32-32,'desk2')
                   }  else if (this.roomMaterial[i][j] === 3){
                        game.add.sprite(i*32-32,j*32-32,'desk3')
                   }  else if (this.roomMaterial[i][j] === 4){
                       this.juice = game.add.sprite(i*32-32,j*32-32,'juice');
                       this.juice.scale.x = 1.5;
                       this.juice.scale.y = 1.5;
                   } else if (this.roomMaterial[i][j] === 5){
                       this.coffee = game.add.sprite(i*32-48,j*32-32,'coffee');
                       this.coffee.scale.x = 1.5;
                       this.coffee.scale.y = 1.5;
                   } 
                }
            }
        
        this.door3 = game.add.group();
        this.door3.enableBody = true;
        
        
        this.blockMe = [
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ]
         
         for (var i=0; i<this.blockMe.length; i++) {
                for (var j = 0; j<this.blockMe[i].length; j++) {
                    if (this.blockMe[i][j] === 1) {
                     this.door2 = game.add.sprite(i*32-32,j*32-60,'wall', this.collideWith2);
                     this.door2.visible = false;
                   } else if (this.blockMe[i][j] === 2) {
                     this.door3B = game.add.sprite(i*32-32,j*32-5,'wall',0, this.door3);
                     //this.door3B.visible = false;
                   }
                } 
          }
        
        game.physics.arcade.enable(this.door2);
        
         
        
        
        
        //make bricks immovable when hit
        this.collideWith.setAll('body.immovable', true);  
        this.collideWith2.setAll('body.immovable', true);
        this.door3.setAll('body.immovable', true);
        
        //creates the sprite
        this.sprite = game.add.sprite(0, 200, 'sprite',8);
        this.enemy = game.add.sprite(85,100,'enemy',9);
        
        //enables the physics system for the sprite
        game.physics.arcade.enable(this.sprite);
        
        this.sprite.animations.add('walkDown', [1,2,3,0],8);
        this.sprite.animations.add('walkLeft', [5,6,7,4],8);
        this.sprite.animations.add('walkRight', [9,10,11,8],8);
        this.sprite.animations.add('walkUp', [13,14,15,12],8);
        this.enemy.animations.add('EUp',[9,10,11],8);
        

        this.texts = ['aaaaaa','bbbbbbb','cccccc'];
        var style = {font: '20px Arial', fill:'#FFFFFF', align: 'center'};
        text4 = game.add.text(0,0,"",style);
        
        
        //makes the sprite bouncy
        this.sprite.body.collideWorldBounds = true; 
        
        textbox4 = game.add.sprite(12,300,'textbox');
        textbox4.scale.x = 0.3;
        textbox4.scale.y = 0.2;
        
        this.texts = ['Is he the murder?','I should quickly follow him keeping my distance.'];
        this.juiceTexts = ['$1.00 for soda','........','I don\'t have any money.'];
        this.coffeeTexts = ['HOT Coffee!!','........','It\'s not working'];
        textsDoor = ['It\'s the exit','but the door is locked'];
        var style = {font: '20px Arial', fill:'#FFFFFF', align: 'center'};
        text4 = game.add.text(50,320,'What is that?',style);
    
    },
    
    
    //function that is called 60 times per second
    //where we put the logic of the game
    update: function() {
        
        if (flag4) {
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
        game.physics.arcade.collide(this.sprite,this.door2, this.seNcondDoor);
        game.physics.arcade.collide(this.sprite,this.door3, this.door3T);


        /*if (checkOverlap(this.sprite,this.bookShell)) {
            game.state.start('main2');
        } else {
            return;
        }*/
        
    },
    
    changeText: function() {
        if (!onL4) {    
            try {
                console.log("inside collide");
                text4.text = this.texts[position4++];
            } catch (err) {
                flag4 = true;
                onL4 = true;
                position4 = 0;
                text4.text = '';
                textbox4.visible = false;
                return;
            } 
        } else if (checkOverlap(this.sprite,this.juice)) {
            flag4 = false;
            textbox4.visible = true;
            try {
                console.log("inside collide");
                text4.text = this.juiceTexts[position4++];
            } catch (err) {
                flag4 = true;
                onL4 = false;
                position4 = 0;
                text4.text = '';
                textbox4.visible = false;
                return;
            }
        } else if (checkOverlap(this.sprite,this.coffee)) {
            flag4 = false;
            textbox4.visible = true;
            try {
                console.log("inside collide");
                text4.text = this.coffeeTexts[position4++];
            } catch (err) {
                flag4 = true;
                onL4 = false;
                position4 = 0;
                text4.text = '';
                textbox4.visible = false;
                return;
            }
        } else if (onLL4) {
            flag4 = true;
            onLL4 = false;
            text4.text = '';
            textbox4.visible = false;
        }
    },
    
   door1: function(sprite,door) {
       console.log('in');
        game.state.start('main5');
    },
    
    seNcondDoor: function(sprite,door) {
       console.log('in');
        game.state.start('main6');
    },
    
    door3T: function (sprite,door) {
        console.log(textbox);
        textbox4.visible = true;
        text4.text = textsDoor;
        onLL4 = true;
        flag4 = false;
    }
    
    
};
