var PLAY = 1;
var END = 0;
var gameState = PLAY;



var score;


function preload(){
 gunImage = loadImage("Gun.png")
 bImage = loadImage("bullet.png")
 Z1 = loadImage("Zombie 1.png")
 Z2 = loadImage("z2.png")
 Z3 = loadImage("z3.png")
 Z4 = loadImage("z4.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  Gun = createSprite(100,windowHeight/2)
  Gun.addImage(gunImage)
  Gun.scale = (0.5)
  Zg = new Group()
  Bg = new Group()
  line = createSprite(300,windowHeight/2,4,windowHeight)
  Edge = createEdgeSprites()
}

function draw() {
  background(180);
  //displaying score
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    if(keyDown("LEFT_ARROW")&& Gun.rotation>-30){
      Gun.rotation -= 10
      
    }
    if(keyDown("RIGHT_ARROW")&& Gun.rotation<120){
      Gun.rotation += 10
      console.log(Gun.rotation)
    }
    if(keyDown("UP_ARROW")){
      Gun.y -= 10
    }
    if(keyDown("DOWN_ARROW")){
      Gun.y += 10
    }
    if(Bg.isTouching(Zg)){
      Zg.destroy()
    }
    createZombie()
    createbullet()
    if(Zg.isTouching(line)){
      gameState = END
    }

  }
   else if (gameState === END) {
    Zg.setVelocityXEach(0)
    Zg.setLifetimeEach(-1)

   }
  Gun.collide(Edge)
   
  drawSprites();
}

function createbullet(){
  if(keyDown("SPACE")){
    bullet = createSprite(Gun.x+200,Gun.y)
    bullet.addImage(bImage)
    //bullet.rotation = Gun.rotation//
    bullet.scale = 0.2
    bullet.velocityX = 15
    Bg.add(bullet)
  }
}
function createZombie(){
if(frameCount%60==0){
  Zombie = createSprite(width, Math.round(random(50,height)))
  Zombie.debug = true
  Zombie.velocityX = -10
  Zombie.lifetime = 300
  Random = (Math.round(random(1,3)))
  switch(Random){
    case 1 : Zombie.addImage(Z1)
             Zombie.scale = 0.7
             Zombie.setCollider("rectangle",0,0,300,400)
             break
    
    case 2 : Zombie.addImage(Z2)
             break

    case 3 : Zombie.addImage(Z3)
             Zombie.scale = 0.5
             Zombie.setCollider("rectangle",0,0,300,400)
             break
    default: break
  }
  Zg.add(Zombie)
}
}