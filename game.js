var gameport = document.getElementById("gameport");
PIXI.Loader.shared.add("spriteSheet.json").load(setup);

var renderer = PIXI.autoDetectRenderer({width: 400, height: 400, backgroundColor: 0x444444});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//Will be used to keep track of points
//playerScore will be used to render the score in game
var score = 0;

var time = 30;

PIXI.sound.add('dead', 'dead.wav');
PIXI.sound.add('win', 'Win.wav');

//Game over text
gameOver = new PIXI.Text("GAME OVER \nThe Ghost hunters\ngot you!");
gameOver.x = 120;
gameOver.y = 150;

//You win text
youWin = new PIXI.Text("You Win!!!");
youWin.x = 145;
youWin.y = 150;

//play again prompt
restart = new PIXI.Text("Play Again?\n(Click Here)");
restart.x = 135;
restart.y = 250;
restart.interactive = true;
restart.click = function(e)
{
	location.reload();
}

//Welcome screen
welcome = new PIXI.Text("Welcome the the Haunting Game!\n         Press space to begin!");
welcome.x = 5;
welcome.y = 100;
stage.addChild(welcome)

//credits info
info = new PIXI.Text("Game and sound by Dylan");
info.x = 35;
info.y = 100;

//back
back = new PIXI.Text("Back");
back.x = 160;
back.y = 200;
back.interactive = true;
back.click = function(e)
{
  stage.removeChild(back);
  stage.removeChild(info);
  stage.addChild(welcome);
  stage.addChild(credits);
}
//Credits
credits = new PIXI.Text("Credits");
credits.x = 145;
credits.y = 300;
credits.interactive = true;
credits.click = function(e)
{
  stage.removeChild(welcome);
  stage.removeChild(credits);
  stage.addChild(info);
  stage.addChild(back);
}
stage.addChild(credits);


function setup()
{
var sheet = PIXI.Loader.shared.resources["spriteSheet.json"].spritesheet;



var player = new PIXI.Sprite(sheet.textures["Ghost.png"]);

//Initial placement of players character
player.anchor.x = 0.5;
player.anchor.y = 0.5;
player.position.x = 200;
player.position.y = 200;

//Shrink ghost 
player.scale.x = .3;
player.scale.y = .3;


//House creation for game


var houses = [];
var house = new PIXI.Sprite(sheet.textures["House.png"]);
houses.push(house);
var house1 = new PIXI.Sprite(sheet.textures["House.png"]);
houses.push(house1);
var house2 = new PIXI.Sprite(sheet.textures["House.png"]);
houses.push(house2);
var house3 = new PIXI.Sprite(sheet.textures["House.png"]);
houses.push(house3);
var house4 = new PIXI.Sprite(sheet.textures["House.png"]);
houses.push(house4);

house.position.x = 350;
house.position.y = 350;


house1.position.x = 100;
house1.position.y = 300;


house2.position.x = 300;
house2.position.y = 50;


house3.position.x = 50;
house3.position.y = 50;


house4.position.x = 50;
house4.position.y = 150;




//Used for keyboard input
function keydownEventHandler(e) {

    if (e.keyCode == 87) { // W key
      PIXI.sound.play('dead');
      var newy = player.position.y - 40;
      createjs.Tween.get(player.position).to({x: player.position.x, y: newy}, 500);
    }
  
    if (e.keyCode == 83) { // S key
      PIXI.sound.play('dead');
      var newy = player.position.y + 40;
      createjs.Tween.get(player.position).to({x: player.position.x, y: newy}, 500);
    }
    if (e.keyCode == 65) { // A key
      PIXI.sound.play('dead');
      var newx = player.position.x - 40;
      createjs.Tween.get(player.position).to({x: newx, y: player.position.y}, 500);
    }
  
    if (e.keyCode == 68) { // D key
      PIXI.sound.play('dead');
      var newx = player.position.x + 40;
      createjs.Tween.get(player.position).to({x: newx, y: player.position.y}, 500);
    }
    
    if (e.keyCode == 32) {
      PIXI.sound.play('win');
      
      stage.addChild(player);
      stage.addChild(house);
      stage.addChild(house1);
      stage.addChild(house2);
      stage.addChild(house3);
      stage.addChild(house4);
      stage.removeChild(welcome);
      stage.removeChild(credits);
    }
  }

//Listens to the keyboard presses to move the player
document.addEventListener('keydown', keydownEventHandler);
var rand = Math.floor(Math.random()*5)
console.log(rand);
function animate()
{
    var playing = true;
    
    for(i = 0; i<5; i++)
    {
        var houseCoordinates = houses[i].getBounds();
        var ghostBounds = player.getBounds();
        
        if((houseCoordinates.x + houseCoordinates.width/2) + houseCoordinates.width > (ghostBounds.x + ghostBounds.width/2) 
        && (houseCoordinates.x + houseCoordinates.width/2) < (ghostBounds.x+ ghostBounds.width/2) + player.width 
        && (houseCoordinates.y +houseCoordinates.height/2) + houseCoordinates.height > (ghostBounds.y + ghostBounds.height/2) 
        && (houseCoordinates.y+houseCoordinates.height/2) < (ghostBounds.y + ghostBounds.height/2) + ghostBounds.height)
        {
            if(i != rand)
            {
              
                stage.addChild(gameOver);
                stage.addChild(restart);
                
                
            }
            else{
                score += 1;
                
            }
           
        }
        if(score>1)
        {
            
            stage.addChild(youWin);
            stage.addChild(restart);
            
        }

    }
    console.log(playing);
    if(playing)
    {
        renderer.render(stage);
        requestAnimationFrame(animate);
    }

}
animate();
}

