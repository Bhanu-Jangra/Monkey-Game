var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var ground,groundImage;
var score
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  
  
}



function setup() {
  createCanvas(500,500);
  
  
  monkey = createSprite(130,300,10,10);
  monkey.addAnimation("running",monkey_running);
  monkey.scale = 0.2;
  
  ground = createSprite(220,405,1000,10);
  ground.x = ground.width/2;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();  
  
  score = 0;
  survivalTime = 0;
  
}


function draw() {
  background("white");
  
  if(keyDown("space")&& monkey.y >= 300){
  monkey.velocityY = -12;
}
   ground.velocityX = -4;
    
  monkey.velocityY = monkey.velocityY + 0.6;
  
  if(ground.x < 0){
    ground.x = ground.width/2;
}    
  
  if(foodGroup.isTouching(monkey)){
    foodGroup.destroyEach();
    score = score+1;
  }    


 


  monkey.collide(ground);
  
  food();
  obstacles();
  reset();
  drawSprites();
  
  textSize(20);
  text("Score : "+ score,400,30);
  
  textSize(20);
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time: " + survivalTime,340,70);
  
}

function reset(){
  if(obstacleGroup.isTouching(monkey)){
    score = 0;
    }
}



function food(){
if(frameCount%80 === 0){
  banana = createSprite(460,140,10,10);
  banana.y = Math.round(random(140,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.velocityX = -4;  
  banana.lifetime = -1;
  
  banana.setCollider("circle",0,0,200);
  //banana.debug = true;
  
  foodGroup.add(banana);
  
} 
}

function obstacles(){
if(frameCount%100 === 0){
  obstacle = createSprite(460,370,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.15;
  obstacle.velocityX = -5;
  obstacle.lifetime = -1;
  
  obstacle.setCollider("circle",0,0,220);
  //obstacle.debug = true;
  
  obstacleGroup.add(obstacle);
  
}
}

