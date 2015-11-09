var mainState = {
	preload: function() {
        game.load.spritesheet('character', 'assests/images/Horror game character sprite sheet.png',32,48);
        game.load.image('woodFloor','assests/images/Tile map material/WoodFloor 2.png' );
        game.load.image('woodWall','assests/images/Tile map material/cover wall.png' );
        game.load.image('bed','assests/images/Tile map material/histopal bed 2.png' );
        game.load.image('bookShell','assests/images/Tile map material/book shell.png' );
        game.load.image('wall','assests/images/Tile map material/white wall.png' )
        
        
	},
    
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        this.walls = game.add.group();
        this.walls.enableBody = true;

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
        ]
            for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 1) {
                        game.add.sprite(i*32+160,j*32+64,'woodFloor');
                    } else if (this.room[i][j] === 0){
                        var a = game.add.sprite(i*32+160,j*32+64,'woodWall', null, this.walls);
                        a.body.immovable = true;
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
                        game.add.sprite(i*32+160,j*32+64,'bookShell');
                    } else if (this.roomMaterial[i][j] === 2) {
                        game.add.sprite(i*32+160,j*32+64,'bed')
                    }
                
                }
            
            }
        this.sprite = game.add.sprite(224,192,'character')
        this.sprite.collideWorldBounds = true;
        game.physics.enable(this.sprite);
        this.sprite.animations.add('walkDown', [1,2,3,0],8);
        this.sprite.animations.add('stopDown', [0]);
        this.sprite.animations.add('walkLeft', [5,6,7,4],8);
        this.sprite.animations.add('stopLeft', [4]);
        this.sprite.animations.add('walkRight', [9,10,11,8],8);
        this.sprite.animations.add('stopRight', [8]);
        this.sprite.animations.add('walkUp', [13,14,15,12],8);
        this.sprite.animations.add('stopUp', [12]);
        
    },
    update: function() {
        
        //Get Input
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this.sprite.animations.play('walkLeft'); 
            this.sprite.x -= 2;  
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.animations.play('walkRight');
            this.sprite.x += 2;
        } 
        else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.animations.play('walkUp');
            this.sprite.y -= 2;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.animations.play('walkDown');
            this.sprite.y += 2;
        }
        game.physics.arcade.collide(this.sprite, this.walls);
        //Display Floor
        
    }
}








var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);
game.state.start('main');