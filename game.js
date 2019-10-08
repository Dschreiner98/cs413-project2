var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 400, height: 400, backgroundColor: 0x444444});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//Will be used to keep track of points
//playerScore will be used to render the score in game
var score = 0;

var time = 30;


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
};


var playerTexture = PIXI.Texture.from("Ghost.png");

var player = new PIXI.Sprite(playerTexture);

//Initial placement of players character
player.anchor.x = 0.5;
player.anchor.y = 0.5;
player.position.x = 200;
player.position.y = 200;

//Shrink ghost 
player.scale.x = .3;
player.scale.y = .3;
stage.addChild(player);

//HOuse creation for game
var houseTexture = PIXI.Texture.from("House.png");

var houses = [];
var house = new PIXI.Sprite(houseTexture);
houses.push(house);
var house1 = new PIXI.Sprite(houseTexture);
houses.push(house1);
var house2 = new PIXI.Sprite(houseTexture);
houses.push(house2);
var house3 = new PIXI.Sprite(houseTexture);
houses.push(house3);
var house4 = new PIXI.Sprite(houseTexture);
houses.push(house4);

house.position.x = 350;
house.position.y = 350;
stage.addChild(house);

house1.position.x = 100;
house1.position.y = 300;
stage.addChild(house1);

house2.position.x = 300;
house2.position.y = 50;
stage.addChild(house2);

house3.position.x = 50;
house3.position.y = 50;
stage.addChild(house3);

house4.position.x = 50;
house4.position.y = 150;
stage.addChild(house4);

//Light creation for game
var lightTexture = PIXI.Texture.from("Light.png");

var light = new PIXI.Sprite(lightTexture);



//Used for keyboard input
function keydownEventHandler(e) {

    if (e.keyCode == 87) { // W key
      player.position.y -= 10;
    }
  
    if (e.keyCode == 83) { // S key
      player.position.y += 10;
    }
  
    if (e.keyCode == 65) { // A key
      player.position.x -= 10;
    }
  
    if (e.keyCode == 68) { // D key
      player.position.x += 10;
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
        && (houseCoordinates.x + houseCoordinates.width/2) < (ghostBounds.x+ ghostBounds.width/2) + playerTexture.width 
        && (houseCoordinates.y +houseCoordinates.height/2) + houseCoordinates.height > (ghostBounds.y + ghostBounds.height/2) 
        && (houseCoordinates.y+houseCoordinates.height/2) < (ghostBounds.y + ghostBounds.height/2) + ghostBounds.height)
        {
            if(i == rand)
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