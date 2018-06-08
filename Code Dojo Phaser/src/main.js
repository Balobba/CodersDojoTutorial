var game = new Phaser.Game(800, 400, Phaser.CANVAS,'Phaser-example',{ preload: preload, create: create, update: update, render: render });

function preload(){
  game.load.image('player', 'assets/characters/monkey.png');
  game.load.image('box', 'assets/box.png');
  game.load.image('buttonPressed', 'assets/buttonPressed.png');
  game.load.image('buttonNormal', 'assets/buttonNormal.png');
  game.load.image('etteplan', 'assets/etteplan.png');
  game.load.image('etteplan2', 'assets/etteplan2.png');
  game.load.image('frame', 'assets/frame.png');
  game.load.image('emitter', 'assets/emitterSmall.png');
}

var player;
var cursors;
var background;
var jumpButton;
var jumpTimer = 0;
var bottom;
var button1;
var leftEmitter;
var rightEmitter;
var cable;

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  game.stage.backgroundColor = "#b1d0d5";

  //Bottom
  bottom = game.add.sprite(0, 380, 'box');
  game.physics.arcade.enable(bottom);
  bottom.scale.setTo(800, 0.6);
  bottom.body.immovable = true;
  bottom.body.allowGravity = false;
  bottom.body.enable = true;

  //frame

  frame = game.add.sprite(game.world.width/2, game.world.height/2-100, 'frame');
  frame.anchor.setTo(0.5, 0.5);
  frame.scale.setTo(0.85, 0.5);


  //etteplan logos

  etteplan = game.add.sprite(game.world.width/2, game.world.height/2-100, 'etteplan2');
  etteplan.anchor.setTo(0.5, 0.5);
  etteplan.scale.setTo(0.5, 0.5);



  //Player
  player = game.add.sprite(100, 100, 'player');
  game.physics.arcade.enable(player);
  player.body.gravity.y = 1000;
  player.body.maxVelocity.y = 500;
  player.body.enable = true;
  player.scale.setTo(0.2, 0.2);
  player.body.bounce.set(0.2);
  player.body.collideWorldBounds = true;

  //Controls
  cursors = game.input.keyboard.createCursorKeys();
  jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


  //Button
  button1 = game.add.sprite(game.world.width/2, 330, 'buttonNormal');
  game.physics.arcade.enable(button1);
  button1.body.immovable = true;
  button1.body.allowGravity = false;
  button1.body.enable = true;

  //Emitters
  leftEmitter = game.add.emitter(game.world.width/2-game.world.width/4, game.world.centerY - 200);
  leftEmitter.bounce.setTo(0.5, 0.5);
  leftEmitter.setXSpeed(100, 200);
  leftEmitter.setYSpeed(-50, 50);
  leftEmitter.makeParticles('emitter', 0, 250, true, true);


  rightEmitter = game.add.emitter(game.world.width/2 + game.world.width/4, game.world.centerY - 200);
  rightEmitter.bounce.setTo(0.5, 0.5);
  rightEmitter.setXSpeed(-100, -200);
  rightEmitter.setYSpeed(-50, 50);
  rightEmitter.makeParticles('emitter', 1, 250, true, true);

  leftEmitter.start(false, 2500, 20);
  rightEmitter.start(false, 2500, 20);



}

function update(){

  game.physics.arcade.collide(player, bottom);


  button1.loadTexture('buttonNormal');
  etteplan.loadTexture('etteplan2');
  leftEmitter.on = false;
  rightEmitter.on = false;
  game.physics.arcade.collide(player, button1, function pressedButton() {

    if(button1.body.touching.up){
      button1.loadTexture('buttonPressed');
      etteplan.loadTexture('etteplan');
      leftEmitter.on = true;
      rightEmitter.on = true;




    }
  });



  player.body.velocity.x = 0;

  if (cursors.left.isDown){
    player.body.velocity.x = -150;

  }else if (cursors.right.isDown){
    player.body.velocity.x = 150;
  }

  if (jumpButton.isDown && game.time.now > jumpTimer)
  {
    player.body.velocity.y = -500;
    jumpTimer = game.time.now + 1000;
  }


}


function render(){
  //game.debug.body(player);
  //game.debug.body(button1);
}
