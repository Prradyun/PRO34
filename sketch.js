//Create variables here
var dog, happyDog, database, foodS, foodStock;

var dogImg,happyDogImg;

var database,position;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();

  createCanvas(500, 500);

  dog = createSprite(250,300,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

  
}


function draw() {  

  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
}

  drawSprites();
  //add styles here
  fill(255,255,255);
  stroke("black");
  text("Food remaining :"+foodS,170,200);
  textSize(13);
  text("note:press up arrow to feed the dog",130,10,300,20);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
   
  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  
  database.ref('/').update({
     Food:x
   })
}



