var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.time.advancedTiming = true;
    game.debug.renderShadow = false;
    game.stage.disableVisibilityChange = true;

    //game.plugins.add(new Phaser.Plugin.Isometric(game));
   /* game.load.atlasJSONHash('tileset', 'img/mapa.png', 'img/mapa.json');
    game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    game.iso.anchor.setTo(0.5, 0.1); */

    game.load.tilemap('dung1', 'img/platformer.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('dirt-tiles', 'img/dirt-tiles.png');
    193,202,203,204,205,206,207,208
    226,227,228,229,230,231,232
    249,250,251,252,253,254,255,256
    273,275,276,278,279,280
}

function create() {
	map = game.add.tilemap('dung1');
	map.addTilesetImage('dirt-tiles');
    layer = map.createLayer('layer1');
    layer.resizeWorld();
}


function update() {

}


