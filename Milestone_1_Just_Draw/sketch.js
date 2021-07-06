//Milestone 1. Just Draw

//initializes the width and height of the rectangles
//to be drawn. Assume the dimensions are the same for both.

let rectW = 50; //width of rectangle
let rectH = 50; //height of rectangle

function setup() {
  createCanvas(400, 400);
}

function draw() {
  //set the background of the canvas to light gray
  background(220);
  
  //'stroke' sets the color used to draw lines and borders around shapes
  //in this case the color is black = 0
  
  stroke(0);
  
  //In this case the line connecting the two centers of the rectangles
  //is drawn behind the rectangles.
  
  line(width/2,rectH/2,rectW/2,height/2);
  
  //'Fill' sets the color used to fill shapes
  //Here the two shapes are rectangles (rect).
  //One is set to red (255,0,0) and the other to blue(0,0,255)
  
  fill(255,0,0); //sets fill color to red
  rect(width/2-rectW/2, 0, rectH, rectH);
  
  fill(0,0,255); //sets fill color to blue
  rect(0, height/2-rectH/2, rectH, rectH);
}  