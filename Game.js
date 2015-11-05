var mainState = {
	preload: function() {
        game.load.spritesheet('character', 'assests/images/Horror game character sprite sheet.png',32,48);
        game.load.image('woodFloor','assests/images/Tile map material/WoodFloor 3.png' );
        game.load.image('woodWall','assests/images/Tile map material/cover wall.png' );
        game.load.image('bed','assests/images/Tile map material/histopal bed 2.png' );
        game.load.image('bookShell','assests/images/Tile map material/book shell.png' );
        
        
	},
    
    create: function() {
 

        this.room = [
            [0, 0, 0],
            [0, 1, 0],
            [0, 0, 0]
        ]
            for (var i=0; i<this.room.length; i++) {
                for (var j = 0; j<this.room[i].length; j++) {
                    if (this.room[i][j] === 1) {
                        game.add.sprite(i*32,j*32,'woodFloor');
                    } else {
                        game.add.sprite(i*32,j*32,'woodWall');
                    }
                
                }
            
            }
        this.sprite = game.add.sprite(300,10,'character')
        this.sprite.animations.add('flap', [1,2,3,0],10);
        this.sprite.animations.add('flap2', [0]);
        
    },
    update: function() {
        
        //Get Input
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
             this.sprite.x -= 2;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this.sprite.x += 2;
        } 
  
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            this.sprite.y -= 2;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
            this.sprite.animations.play('flap');
            this.sprite.y += 2;
        } else {
            this.sprite.animations.play('flap2');
        }
          
        //Display Floor
        
    }
}








var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);
game.state.start('main');