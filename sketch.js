var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var coneImg,nailsImg,coneTransit,nails;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadImage("images/mainPlayer3.png");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img = loadImage("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img = loadImage("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img = loadImage("images/opponent9.png");
  
  cycleBell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  
  coneImg = loadImage("images/obstacle1.png");
  nailsImg = loadImage("images/obstacle3.png");
}

function setup(){
  
createCanvas(1200,300);
// Fondo en movimiento
path=createSprite(100,150);
path.addImage("pista",pathImg);
path.velocityX = -5;

//crear el niño que corre
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//establece el colisionador para el mainCyclist
mainCyclist.setCollider("rectangle",0,0,50,50);
  
gameOver = createSprite(300,100);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;
  
pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
conesG = new Group();
nailsG = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Distancia: "+ distance,250,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/40);
   path.velocityX = -(6 + 2*distance/150);
  
   mainCyclist.y = World.mouseY;
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //código para reiniciar el fondo
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //código para reproducir el sonido de la campana del ciclista
  if(keyDown("space")) {
    cycleBell.play();
  }
  
  //crear jugadores oponentes de forma continua
  var select_oppPlayer = Math.round(random(1,5));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else if (select_oppPlayer == 3) {
      redCyclists();
    } else if(select_oppPlayer == 4){
      conesTransit();
    } else {
      nailsObstacle();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addImage("opponentPlayer1",oppPink2Img);
    }else if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addImage("opponentPlayer2",oppYellow2Img);
    } else if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addImage("opponentPlayer3",oppRed2Img);
    } else if(conesG.isTouching(mainCyclist)){
      gameState = END;
      coneTransit.velocityY = 0;
    } else if(nailsG.isTouching(mainCyclist)){
      gameState = END;
      nails.velocityY = 0;
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    //Agrega aquí el código para mostrar la instrucción de reinicio del juego, en forma de texto
  text("¡Presiona la tecla de flecha arriba para reiniciar el juego!",50,250);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addImage("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
  
    conesG.setVelocityXEach(0);
    conesG.setLifetimeEach(-1);
  
    nailsG.setVelocityXEach(0);
    nailsG.setLifetimeEach(-1);

    //escribe la condición para llamar reset( )
  if(keyDown("UP_ARROW") && gameState===END){
    reset();
  }
}
}
function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//Funciones de obstáculos
function conesTransit(){
  coneTransit = createSprite(1100,Math.round(random(50,250)));
  coneTransit.addImage("cono",coneImg);
  coneTransit.scale = 0.07;
  coneTransit.setLifetime=170;
  coneTransit.velocityX=-(6+2*distance/120);
  conesG.add(coneTransit);
}

function nailsObstacle(){
  nails = createSprite(1100,Math.round(random(50,250)));
  nails.addImage("clavos",nailsImg);
  nails.scale = 0.07;
  nails.setLifetime=170;
  nails.velocityX=-(6+2*distance/120);
  nailsG.add(nails);
}

//crea aquí la función de reinicio
  function reset() {
    gameState=PLAY;
    gameOver.visible=false;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
    pinkCG.destroyEach();
    yellowCG.destroyEach();
    redCG.destroyEach();
    conesG.destroyEach();
    nailsG.destroyEach();
    
    distance=0;
  }
