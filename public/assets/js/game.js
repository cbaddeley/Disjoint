var Container = PIXI.Container,
    autoDetectRenderer = PIXI.autoDetectRenderer,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Texture = PIXI.Texture,
    Sprite = PIXI.Sprite,
    Text = PIXI.Text,
    Graphics = PIXI.Graphics;
    b = new Bump(PIXI);
//Create a Pixi stage and renderer and add the
//renderer.view to the DOM
var stage = new Container(),
    renderer = autoDetectRenderer(768, 512);
document.getElementById('gameCanvas').appendChild(renderer.view);

var explo1 = new Audio('assets/sounds/Explosion.wav');
var explo2 = new Audio('assets/sounds/Explosion2.wav');
var laser1 = new Audio('assets/sounds/Laser1.wav');
var laser2 = new Audio('assets/sounds/Laser2.wav');

//Tell the `renderer` to `render` the `stage`
PIXI.loader
  .add("assets/img/gameSprites.json")
  .add("assets/img/explosions.json")
  .add("assets/img/background.png")
  .on("progress", loadProgressHandler);

var ship, state, background, battlecruiser, battleship, bomber, cruiser, redBeam, greenBeam;
var battlecruisers = [];
var battleships = [];
var bombers = [];
var cruisers = [];
var redBeams = [];
var greenBeams = [];
var explosionOneAnim, explosionTwoAnim, explosionThreeAnim, explosionFourAnim, explosionFiveAnim;
//This `setup` function will run when the image has loaded
function setup() {

  var spriteId = resources["assets/img/gameSprites.json"].textures;
  var explosionId = PIXI.loader.resources["assets/img/explosions.json"].textures;
  // console.log(typeof spriteId);
  background = new Sprite(resources["assets/img/background.png"].texture);
  stage.addChild(background);


  ship = new Sprite(spriteId["ship.png"]);
  ship.scale.set(0.4, 0.4);
  ship.x = -50;
  ship.y = renderer.height / 2 - ship.height / 2;
  ship.vx = 0;
  ship.vy = 0;
  stage.addChild(ship);

  //Create the health bar
    healthBar = new Container();
    healthBar.position.set(34, 6);
    stage.addChild(healthBar);

    //Create the black background rectangle
    var innerBar = new Graphics();
    innerBar.beginFill(0xFF3300);
    innerBar.drawRect(0, 0, 700, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    //Create the front red rectangle
    var outerBar = new Graphics();
    outerBar.beginFill(0x008000);
    outerBar.drawRect(0, 0, 700, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);

    healthBar.outer = outerBar;

  //Capture the keyboard arrow keys
  var up = keyboard(38),
      down = keyboard(40);
      space = keyboard(32);

  //Up
  up.press = function() {
    ship.vy = -5;
    ship.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && ship.vx === 0) {
      ship.vy = 0;
    }
  };

  //Down
  down.press = function() {
    ship.vy = 5;
    ship.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && ship.vx === 0) {
      ship.vy = 0;
    }
  };



  var explosionOneframes = [];
    for (var i = 0; i < 24; i++) {
      var val = i < 10 ? '0' + i : i;
        // magically works since the spritesheet was loaded with the pixi loader
        explosionOneframes.push(PIXI.Texture.fromFrame('expl_01_00' + val + '.png'));
    }
    // create an AnimatedSprite (brings back memories from the days of Flash, right ?)
    explosionOneAnim = new PIXI.extras.AnimatedSprite(explosionOneframes);

  var explosionTwoframes = [];
    for (var j = 0; j < 24; j++) {
      var val1 = j < 10 ? '0' + j : j;
      explosionTwoframes.push(PIXI.Texture.fromFrame('expl_02_00' + val1 + '.png'));
    }
    explosionTwoAnim = new PIXI.extras.AnimatedSprite(explosionTwoframes);

  var explosionThreeframes = [];
    for (var k = 1; k < 24; k++) {
      var val2 = k < 10 ? '0' + k : k;
      explosionThreeframes.push(PIXI.Texture.fromFrame('expl_03_00' + val2 + '.png'));
    }
    explosionThreeAnim = new PIXI.extras.AnimatedSprite(explosionThreeframes);

  var explosionFourframes = [];
    for (var l = 0; l < 24; l++) {
      var val3 = l < 10 ? '0' + l : l;
      explosionFourframes.push(PIXI.Texture.fromFrame('expl_04_00' + val3 + '.png'));
    }
    explosionFourAnim = new PIXI.extras.AnimatedSprite(explosionFourframes);

  var explosionFiveframes = [];
    for (var m = 0; m < 32; m++) {
      var val4 = m < 10 ? '0' + m : m;
      explosionFiveframes.push(PIXI.Texture.fromFrame('expl_06_00' + val4 + '.png'));
    }
    explosionFiveAnim = new PIXI.extras.AnimatedSprite(explosionFiveframes);

  //Set the game state
  state = play;
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);
  enemyCreation();
  //Update the current game state
  state();


  background.vx = 2;
  background.x -= background.vx;
  //Render the stage
  renderer.render(stage);
}

function play() {

//=================These are the end game conditions
  if (healthBar.outer.width < 0) {
    state = lose;
  }
  if (background.getGlobalPosition().x < -10000) {
    state = win;
  }
  var spriteId = resources["assets/img/gameSprites.json"].textures;
  //Space
  space.press = function() {
    greenBeam = new Sprite(spriteId["greenBeam.png"]);
    greenBeam.scale.set(1, 1);
    greenBeam.x = ship.getGlobalPosition().x + (ship.width / 2);
    greenBeam.y = ship.getGlobalPosition().y + (ship.height / 2);
    greenBeam.vx = 5;
    stage.addChild(greenBeam);
    greenBeams.push(greenBeam);
    laser2.play();
  };

  ship.y += ship.vy;
  contain(ship, {y: 0, height: 512});

  //collision detection
  greenBeams.forEach(function(greenBeam) {
    b.hit(greenBeam, battlecruisers, true, false, true, function(collision, battlecruiser){
      battlecruisers.splice(battlecruisers.indexOf(battlecruiser), 1);
      stage.removeChild(battlecruiser);
      explosionFiveAnim.x = battlecruiser.getGlobalPosition().x;
      explosionFiveAnim.y = battlecruiser.getGlobalPosition().y;
      explosionFiveAnim.anchor.set(0.5);
      explosionFiveAnim.animationSpeed = 0.5;
      explosionFiveAnim.play();
      explosionFiveAnim.onLoop = function() {
        stage.removeChild(explosionFiveAnim);
      };
      stage.addChild(explosionFiveAnim);
      stage.removeChild(greenBeam);
      greenBeams.splice(greenBeams.indexOf(greenBeam), 1);
      explo1.play();
    });
    b.hit(greenBeam, battleships, true, false, true, function(collision, battleship){
      battleships.splice(battleships.indexOf(battleship), 1);
      stage.removeChild(battleship);
      explosionFourAnim.x = battleship.getGlobalPosition().x;
      explosionFourAnim.y = battleship.getGlobalPosition().y;
      explosionFourAnim.anchor.set(0.5);
      explosionFourAnim.animationSpeed = 0.5;
      explosionFourAnim.play();
      explosionFourAnim.onLoop = function() {
        stage.removeChild(explosionFourAnim);
      };
      stage.addChild(explosionFourAnim);
      stage.removeChild(greenBeam);
      greenBeams.splice(greenBeams.indexOf(greenBeam), 1);
      explo1.play();
    });
    b.hit(greenBeam, bombers, true, false, true, function(collision, bomber){
      bombers.splice(bombers.indexOf(bomber), 1);
      stage.removeChild(bomber);
      explosionThreeAnim.x = bomber.getGlobalPosition().x;
      explosionThreeAnim.y = bomber.getGlobalPosition().y;
      explosionThreeAnim.anchor.set(0.5);
      explosionThreeAnim.animationSpeed = 0.5;
      explosionThreeAnim.play();
      explosionThreeAnim.onLoop = function() {
        stage.removeChild(explosionThreeAnim);
      };
      stage.addChild(explosionThreeAnim);
      stage.removeChild(greenBeam);
      greenBeams.splice(greenBeams.indexOf(greenBeam), 1);
      explo1.play();
    });
    b.hit(greenBeam, cruisers, true, false, true, function(collision, cruiser){
      cruisers.splice(cruisers.indexOf(cruiser), 1);
      stage.removeChild(cruiser);
      explosionTwoAnim.x = cruiser.getGlobalPosition().x;
      explosionTwoAnim.y = cruiser.getGlobalPosition().y;
      explosionTwoAnim.anchor.set(0.5);
      explosionTwoAnim.animationSpeed = 0.5;
      explosionTwoAnim.play();
      explosionTwoAnim.onLoop= function() {
        stage.removeChild(explosionTwoAnim);
      };
      stage.addChild(explosionTwoAnim);
      stage.removeChild(greenBeam);
      greenBeams.splice(greenBeams.indexOf(greenBeam), 1);
      explo1.play();
    });
  });

  battlecruisers.forEach(function(battlecruiser) {

    shoot(battlecruiser);

    battlecruiser.x += battlecruiser.vx;
    battlecruiser.y += battlecruiser.vy;

    var battlecruiserHitsWall = contain(battlecruiser, {y:0, x: -100, height: 512});

    if (battlecruiserHitsWall === "top" || battlecruiserHitsWall === "bottom") {
      battlecruiser.vy *= -1;
    }

    if (battlecruiserHitsWall === "left") {
      battlecruisers.splice(battlecruisers.indexOf(battlecruiser), 1);
      stage.removeChild(battlecruiser);
    }
  });

  battleships.forEach(function(battleship) {

    shoot(battleship);

    battleship.x += battleship.vx;
    battleship.y += battleship.vy;

    var battleshipHitsWall = contain(battleship, {y:0, x: -100, height: 512});

    if (battleshipHitsWall === "top" || battleshipHitsWall === "bottom") {
      battleship.vy *= -1;
    }

    if (battleshipHitsWall === "left") {
      battleships.splice(battleships.indexOf(battleship), 1);
      stage.removeChild(battleship);
    }
  });

    cruisers.forEach(function(cruiser) {
      shoot(cruiser);
        cruiser.x += cruiser.vx;
        cruiser.y += cruiser.vy;
        var cruiserHitsWall = contain(cruiser, {y:0, x: -100, height: 512});
        if (cruiserHitsWall === "top" || cruiserHitsWall === "bottom") {
          cruiser.vy *= -1;
        }
        if (cruiserHitsWall === "left") {
          stage.removeChild(cruiser);
          cruisers.splice(cruisers.indexOf(cruiser), 1);
        }
    });
    bombers.forEach(function(bomber) {
      shoot(bomber);
        bomber.x += bomber.vx;
        bomber.y += bomber.vy;
        var bomberHitsWall = contain(bomber, {y:0, x: -100, height: 512});
        if (bomberHitsWall === "top" || bomberHitsWall === "bottom") {
          bomber.vy *= -1;
        }
        if (bomberHitsWall === "left") {
          stage.removeChild(bomber);
          bombers.splice(bombers.indexOf(bomber), 1);
        }
    });
    redBeams.forEach(function(redBeam) {
        redBeam.x += redBeam.vx;
        var redBeamHitsWall = contain(redBeam, {x: -100});
        if (redBeamHitsWall === "left") {
          stage.removeChild(redBeam);
          redBeams.splice(redBeams.indexOf(redBeam), 1);
        }
        if(hitTestRectangle(ship, redBeam)) {
          ship.alpha = 0.5;
          healthBar.outer.width -= 1;
          stage.removeChild(redBeam);
          explosionOneAnim.x = redBeam.getGlobalPosition().x + (redBeam.width / 2);
          explosionOneAnim.y = redBeam.getGlobalPosition().y + (redBeam.height / 2);
          explosionOneAnim.anchor.set(0.5);
          explosionOneAnim.animationSpeed = 0.5;
          explosionOneAnim.play();
          explosionOneAnim.onLoop = function() {
            stage.removeChild(explosionOneAnim);
          };
          stage.addChild(explosionOneAnim);
          explo2.play();
        } else {
          ship.alpha = 1;
        }

    });
    greenBeams.forEach(function(greenBeam) {
        greenBeam.x += greenBeam.vx;
        var greenBeamHitsWall = contain(greenBeam, {width: 800});
        if ( greenBeamHitsWall === "right") {
          greenBeams.splice(greenBeams.indexOf(greenBeam), 1);
          stage.removeChild(greenBeam);
        }
    });
}

function shoot(currentSprite) {
  var chanceToCreate = Math.random() * 1000;
  var spriteId = resources["assets/img/gameSprites.json"].textures;
  if (chanceToCreate < 10) {
    redBeam = new Sprite(spriteId["redBeam.png"]);
    redBeam.scale.set(1, 1);
    redBeam.x = currentSprite.getGlobalPosition().x + (currentSprite.width / 2);
    redBeam.y = currentSprite.getGlobalPosition().y + (currentSprite.height / 2);
    redBeam.vx = -5;
    redBeams.push(redBeam);
    stage.addChild(redBeam);
    laser1.play();
  }
}

function enemyCreation() {
  var chanceToCreate = Math.random() * 100;
  var spriteId = resources["assets/img/gameSprites.json"].textures;
  if (background.getGlobalPosition().x > -9232) {
    if (chanceToCreate < 1) {
      battlecruiser = new Sprite(spriteId["Alien-Battlecruiser.png"]);
      battlecruiser.scale.set(0.4, 0.4);
      battlecruiser.x = 800;
      battlecruiser.y = Math.random() * renderer.height - battlecruiser.height;
      battlecruiser.vx = -3.5;
      battlecruiser.vy = -2;
      battlecruisers.push(battlecruiser);
      stage.addChild(battlecruiser);
    } else if (chanceToCreate >=1 && chanceToCreate < 2) {
      battleship = new Sprite(spriteId["Alien-Battleship.png"]);
      battleship.scale.set(0.4, 0.4);
      battleship.x = 800;
      battleship.y = Math.random() * renderer.height - battleship.height;
      battleship.vx = -4;
      battleship.vy = -1;
      battleships.push(battleship);
      stage.addChild(battleship);
    } else if (chanceToCreate >=2 && chanceToCreate < 3) {
      bomber = new Sprite(spriteId["Alien-Bomber.png"]);
      bomber.scale.set(0.4, 0.4);
      bomber.x = 800;
      bomber.y = Math.random() * renderer.height - bomber.height;
      bomber.vx = -3;
      bomber.vy = -3;
      bombers.push(bomber);
      stage.addChild(bomber);
    } else if (chanceToCreate >=3 && chanceToCreate < 4) {
      cruiser = new Sprite(spriteId["Alien-Cruiser.png"]);
      cruiser.scale.set(0.4, 0.4);
      cruiser.x = 800;
      cruiser.y = Math.random() * renderer.height - cruiser.height;
      cruiser.vx = -2.5;
      cruiser.vy = -3;
      cruisers.push(cruiser);
      stage.addChild(cruiser);
    }
  }
}

//The `keyboard` helper function
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the precentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

}

function contain(sprite, container) {

  var collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}

function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

function lose() {
  $("#loseModal").show();
}

function win() {
  $("#winModal").show();
}




$( document ).ready(function() {
  $("#startModal").show();
});

$("#startGame").click(function() {
  $("#startModal").hide();
  PIXI.loader.load(setup);
  $('#player').get(0).play();
});
