var dog,happyDog,FoodS,FoodStock;
var happyDog2;
var database
var feed,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  happyDog = loadImage("dogImg.png");
  happyDog2 = loadImage("dogImg1.png");
}

function setup() {
	createCanvas(1000,500);
  database = firebase.database();

  dog = createSprite(790,300);
  dog.addImage(happyDog);
  dog.scale = 0.5;

  FoodStock = database.ref('Food');
  FoodStock.on("value",readStock);

  feed = createButton("FEED YOUR DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("ADD MORE FOOD");
  addFood.position(850,95);
  addFood.mousePressed(addFoods);

  foodObj = new Food();

  
}


function draw() {
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM",150,60);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",150,60);
   }else{
     text("Last Feed : "+ lastFed + " AM", 150,60);
   }
 
  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
dog.addImage(happyDog2);

foodObj.updateFoodStock(foodObj.getFoodStock()-1);
database.ref('/').update({
  Food:foodObj.getFoodStock(),
  FeedTime: hour()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
