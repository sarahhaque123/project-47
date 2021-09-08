var dungeonImg, dungeon1;
var dungeon2Img, dungeon2; 
var coin, coinImg;

var mainCharacterImg, mainCharacter;

var gameState;

var ball
var playerPaddle
var computerPaddle

var compScore = 0;
var playerScore = 0;

function preload(){
  dungeonImg = loadImage("dungeon1.jpg");
  dungeon2Img = loadImage("dungeon2.jpg");
  coinImg = loadImage("coin.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  dungeon1 = createSprite(width/2, height/2);
  dungeon1.addImage(dungeonImg);
  dungeon1.scale = 2.46;

  ball = createSprite(200,200,10,10);
  playerPaddle = createSprite(380,200,10,70);
  computerPaddle = createSprite(10,200,10,70);

  gameState = 1;

  mainCharacter = createSprite(200, 670);
}

function draw() {
  background(220);
  drawSprites();
  mainCharacter.velocityX = 0;
  if(keyIsDown(UP_ARROW)){
    mainCharacter.y -= 3;
  }
  if(keyIsDown(DOWN_ARROW)){
    mainCharacter.y += 3;
  }
  if(keyIsDown(LEFT_ARROW)){
    mainCharacter.velocityX = -3;
  }
  if(keyIsDown(RIGHT_ARROW)){
    mainCharacter.velocityX = 3;
  }

  if(mainCharacter.x >= 1244 && mainCharacter.y <= 520){
    gameState = 2;
    mainCharacter.x = 179;
    mainCharacter.y = 717;
  }

  if(gameState === 2){
    dungeon1.addImage(dungeon2Img)
    dungeon1.scale = 2.5;
    
    coin = createSprite(125, 273);
    coin.addImage(coinImg);
    coin.scale = 0.05;

    if(mainCharacter.isTouching(coin)){
      coin.hide();
    }

    if(mainCharacter.x > 707 && mainCharacter.x < 767 && mainCharacter.y < 111){
      createCanvas(400,400);
      gameState = 3;
    }
  }

  if(gameState === 3){
    miniGameState = "serve";
    pongGame();
    dungeon1.visible = false;
    mainCharacter.visible = false;
  }

  console.log("x" + mainCharacter.x);
  console.log(mainCharacter.y);
}

function pongGame(){
    //place info text in the center
    if (miniGameState === "serve") {
      text("Press Space to Serve",150,180);
    }
     
    //display scores
    text(compScore, 170,20);
    text(playerScore, 230,20);
    
    //make the player paddle move with the mouse's y position
    playerPaddle.y = mouseY;
    
    //AI for the computer paddle
    //make it move with the ball's y position
    computerPaddle.y = ball.y;
    
    //draw line at the centre
    for (var i = 0; i < 400; i=i+20) {
      line(200,i,200,i+10);
    }

    //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  edges = createEdgeSprites();
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
 
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  miniGameState === "serve") {
    serve();
    miniGameState = "play";
  }
  
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    
    if(ball.x > 400) {
      compScore = compScore + 1;
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    miniGameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = 2;
  }
  
  if (keyDown("r") && gameState === "over") {
    miniGameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}