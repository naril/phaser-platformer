(function () {

var game = new Phaser.Game(1024, 320, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.tilemap('dung1', 'img/mapa-simple.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('blue-dirt', 'img/blue-dirt.png');
    game.load.spritesheet('char', 'img/dude.png', 32, 48);
}

var map;
var layer;
var player;
var cursors;
var jumpButton;
var facing = 'left';
var jumpTimer = 0;

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
	
    map = game.add.tilemap('dung1');
	map.addTilesetImage('blue-dirt');
    map.setCollisionByExclusion([2,3,4,5,6,14]);
    layer = map.createLayer('layer1');
    layer.resizeWorld();
    layer.debug = true;

    game.physics.arcade.gravity.y = 250;
    player = game.add.sprite(50, 20, 'char');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    player.body.bounce.y = 0.2;
    player.body.setSize(20, 32, 5, 16);

    player.animations.add('left', [9, 10, 11], 10, true);
   // player.animations.add('turn', [0, 1, 2], 20, true);
    player.animations.add('right', [3, 4, 5], 10, true);

    game.camera.follow(player);
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}


function update() {
    game.physics.arcade.collide(player, layer);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
        player.body.velocity.x = -150;

        if (facing != 'left') {
            player.animations.play('left');
            facing = 'left';
        }
    } else if (cursors.right.isDown) {
        player.body.velocity.x = 150;

        if (facing != 'right') {
            player.animations.play('right');
            facing = 'right';
        }
    } else {
        if (facing != 'idle') {
            player.animations.stop();

            if (facing == 'left') {
                player.frame = 0;
            } else {
                player.frame = 0;
            }

            facing = 'idle';
        }
    }
    
    if (jumpButton.isDown && player.body.onFloor() && game.time.now > jumpTimer)
    {
        player.body.velocity.y = -250;
        jumpTimer = game.time.now + 750;
    }

}

})();
