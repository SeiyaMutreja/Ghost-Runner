var gameState = "PLAY";
var tower, towerImage;
var ghost, ghostImage;
var doorImage, door, doorsGroup;
var climber, climberImage, climbersGroup;
var invisibleGround, invisibleGroup;
var spookySound;

function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup (){
  createCanvas(600,600);
  
  spookySound.play();
  
  //tower
  tower = createSprite(300,300,50,50);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  //door
  doorsGroup = new Group();
  
  //climber
  climbersGroup = new Group();
  
  //invisible ground
  invisibleGroup = new Group();
  
  //ghost
  ghost = createSprite(200, 200, 50, 50);
  ghost.addImage(ghostImage);
  ghost.scale = 0.3;
}

function draw(){
  background("black");
  if (gameState==="PLAY"){
    if (tower.y>400){
    tower.y = 300;
    }
    //ghost movements
    if (keyDown("space")){
      ghost.velocityY = -5;
  
    }
    if (keyDown("right_arrow")){
      ghost.x = ghost.x + 3;
    }
    if (keyDown("left_arrow")){
      ghost.x = ghost.x - 3;
    }
    //gravity
    ghost.velocityY = ghost.velocityY + 0.8;
  
    //railing ghost velocity
    if (ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }
  
   //invisible ground
    if (ghost.isTouching(invisibleGroup)||ghost.y>600){
      ghost.destroy();
      gameState = "END";
    }
  
    spawnDoors();
    
    drawSprites();
  }
  if (gameState==="END"){
    textSize(50);
    fill("yellow");
    textFont('Courier New');
    text("GAME OVER", 140, 255);
  }
  
  
}

function spawnDoors(){
  if (frameCount%240===0){
    //create door
    door = createSprite(200,-50);
    door.addImage(doorImage);
    door.x = Math.round(random(120,400));
    door.velocityY = 1;
    door.lifetime = 800;
    
    //add ghost depth
    ghost.depth = door.depth;
    ghost.depth += 1;
    
    //add door to doorsGroup
    doorsGroup.add(door);
    
    //create climbers
    climber = createSprite(200,10);
    climber.addImage(climberImage);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    //create an invisible ground
    invisibleGround = createSprite(200, 15);
    invisibleGround.width = climber.width;
    invisibleGround.height = 2;
    invisibleGround.x = door.x;
    invisibleGround.velocityY = 1;
    invisibleGround.lifetime = 800;
    invisibleGround.visible = false;
    invisibleGroup.add(invisibleGround);
  }
}