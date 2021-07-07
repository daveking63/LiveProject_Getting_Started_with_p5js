//Milestone 3 - Let's Be Interactive

//initialize
// two changes that could be made but haven't
// a. used rectMode(CENTER) or rectMode(RADIUS)
// b. write general purpose function to bound
//    movements of blue rectangle to canvas borders

let wRect = 50; //width of rectangle
let hRect = 50; //height of rectangle

let xBPos = 0; //X position of upper left corner of blue rectangle
let xBDirection = 1; //direction blue rectangle is moving (right=1/left=-1)
let xBSpeed = 1; //speed at which blue rectangle is moving

let yBPos; //Y position of upper left corner of blue rectangle
let yLPos; //Y position of bottom end of line
let yInc = 3; //when up and down arrows pressed Y position moved up or down yInc

let leftEdge = 0; //left edge x loc where blue rect should reverse directions 
let rightEdge; //right edlge x loc where blue rect should reverse directions

let rStop = 0; //flag to indicate whether blue rect stopped or not my mouse click

function setup() {
  createCanvas(400, 400);
  rightEdge = width - wRect
  yBPos = height/2-hRect/2;
  yLPos = height/2;
}

function draw() {
  //set the background of the canvas to light gray
  background(220);
  
  //Test to see if the rectangle exceeds the boundaries of the canvas
  //If it does, reverse its direction by multiplying by -1
  
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
  
  line(width/2,hRect/2,xBPos + wRect/2,yLPos);
  
  //'Fill' sets the color used to fill shapes
  //Here the two shapes are rectangles (rect).
  //One is set to red (255,0,0) and the other to blue(0,0,255)  
  
  fill(255,0,0); //sets fill color to red
  rect(width/2-wRect/2, 0, wRect, hRect);
  
  fill(0,0,255); //sets fill color to blue
  rect(xBPos, yBPos, wRect, hRect);
}

function keyPressed() {
  if (keyCode === 32){  //SPACE bar
    xBDirection *= -1;
  } else if (keyCode === UP_ARROW) {
    yBPos -= yInc;
    yLPos -= yInc;
    if (yBPos < 0){
      yBPos = 0;
      yLPos = hRect/2;
    }
  } else if (keyCode === DOWN_ARROW) {
    yBPos += yInc;
    yLPos += yInc;
    if (yBPos + hRect > height){
      yBPos = height - hRect;
      yLPos = height - hRect/2;
    }
  }
}

function mouseClicked() {
  // is mouse clicked within blue rectangle?
  let cX = xBPos + wRect/2; //X position of center of blue rectangle
  let cY = yBPos + hRect/2; //Y position of center of blue rectangle
  if ((abs(cX-mouseX) < wRect/2) && (abs(cY-mouseY) < hRect/2)){
    // check to see if blue rectangle is moving or stopped
    if (rStop === 0){ //moving then stop
      rStop = 1;
      noLoop();
    } else { //stopped now move
      rStop = 0;
      loop();
    }  	
    
  //if mouse is pressed outside blue box move center of box to mouseX,mouseY
  //and adjust upper corners of box and bottom end of line accordingly
  } else {
    xBPos = mouseX - wRect/2;
    yBPos = mouseY - hRect/2;
    yLPos = mouseY;
    // if left side of box is moving past the left border of canvas
    // then it will be adjusted to be on the left border in which case
    // it will reverse direction
    if (xBPos < 0){
      xBPos = 0;
    } else if (xBPos + wRect > width){
      //if right corner of box is moving past right border of canvas 
      // then adjust x position so that rectangle will be at the left of border
      // and will reverse direction
      xBPos = width - wRect;
    }
    if (yBPos < 0){
      yBPos = 0;
      yLPos = hRect/2;
    } else if (yBPos + hRect > height){
      yBPos = height - hRect;
      yLPos = height - hRect/2;
    }
  }
}