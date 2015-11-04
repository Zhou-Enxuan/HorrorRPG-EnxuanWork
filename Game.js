var mainState = {
	preload: function() {
		game.load.image('map','assests/images/2cd3b4fd5266d01625fb3110962bd40735fa352b.png' );
        game.load.spritesheet('character', 'assests/images/Horror game character sprite sheet.png',32,48);
	},
    
    create: function() {
    
        this.map = game.add.tileSprite(0,0,game.world.width, game.world.height, 'map');
        this.map.tileScale.set(0.4);
        this.sprite = game.add.sprite(300,10,'character')
        this.sprite.animations.add('flap', [1,2,3,0],10);
        this.sprite.animations.add('flap2', [0])
        this.cursor = game.input.keyboard.createCursorKeys();
    },
    update: function() {
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
            
        
    }
}








var game = new Phaser.Game(640, 480, Phaser.AUTO, 'gameDiv');

game.state.add('main', mainState);
game.state.start('main');