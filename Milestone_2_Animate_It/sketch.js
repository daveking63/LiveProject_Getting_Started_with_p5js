//Milestone 2- Animate It

//initialize the width, height of rectangles.

let wRect = 50; //width of rectangle
let hRect = 50; //height of rectangle

let xBPos = 0; //loc of X of upper left corner of blue rectangle
let xBDirection = 1; //direction blue rectangle is moving (right=1/left=-1)
let xBSpeed = 1; //speed at which blue rectangle is moving
let leftEdge = 0; //left edge x loc where blue rect should reverse directions 
let rightEdge; //right edge x loc where blue rect should reverse directions

function setup() {
  createCanvas(400, 400);
  rightEdge = width - wRect
}

function draw() {
  //set the background of the canvas to light gray
  background(220);
  
  // Test to see if the rectangle exceeds the boundaries of the canvas
  // If it does, reverse its direction by multiplying by -1
  
  if (xBPos < leftEdge || xBPos > rightEdge) {
    xBDirection *= -1;
  }
  
  //update position of upper left corner of rectangle
  xBPos = xBPos + xBSpeed * xBDirection;

  //'stroke' sets the color used to draw lines and borders around shapes
  //in this case the color is black = 0
  
  stroke(0);
  
  //In this case the line connecting the two centers of the rectangles
  //is drawn behind the rectangles.
  
  line(width/2,hRect/2,xBPos + wRect/2,height/2);
  
  //'Fill' sets the color used to fill shapes
  //Here the two shapes are rectangles (rect).
  //One is set to red (255,0,0) and the other to blue(0,0,255)  
  
  fill(255,0,0); //sets fill color to red
  rect(width/2-wRect/2, 0, wRect, hRect);
  
  fill(0,0,255); //sets fill color to blue
  //print(xBPos, xBDirection, updateCnt)
  rect(xBPos, height/2-hRect/2, wRect, hRect);

} 