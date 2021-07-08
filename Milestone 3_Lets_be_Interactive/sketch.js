//Milestone 3 - Let's Be Interactive

//initialize for left-right objects

let wRect = 50; //width of rectangle
let hRect = 50; //height of rectangle

let bRPosX = 0; //X position of upper left corner of blue rectangle
let bRDirectionX = 1; //direction blue rectangle is moving (right=1/left=-1)
let bRSpeedX = 1; //speed at which blue rectangle is moving

let bRPosY; //Y position of upper left corner of blue rectangle
let lnPosY; //Y position of bottom end of line
let yInc = 3; //when up and down arrows pressed Y position moved up or down yInc

let leftEdge = 0; //left edge (X) of canvas where blue rect should reverse directions 
let rightEdge; //right edge (X) of canvas where blue rect should reverse directions

let bRStopped = 0; //flag to indicate whether blue rect stopped (1) or not (0) by mouse click

function setup() {
  createCanvas(600, 400);
  rightEdge = width - wRect
  bRPosY = height/2-hRect/2;
  lnPosY = height/2;
}

function draw() {
  //set the background of the canvas to light gray
  background(220);
  
  //Test to see if the rectangle exceeds the boundaries of the canvas
  //If it does, reverse its direction by multiplying by -1
  
  if (bRPosX < leftEdge || bRPosX > rightEdge) {
    bRDirectionX *= -1;
  }
  
  //update position of upper left corner of rectangle
  bRPosX = bRPosX + bRSpeedX * bRDirectionX;
  
  //'stroke' sets the color used to draw lines and borders around shapes
  //in this case the color is black = 0
  
  stroke(0);
  
  //In this case the line connecting the two centers of the rectangles
  //is drawn behind the rectangles.
  
  line(width/2,hRect/2,bRPosX + wRect/2,lnPosY);
  
  //'Fill' sets the color used to fill shapes
  //Here the two shapes are rectangles (rect).
  //One is set to red (255,0,0) and the other to blue(0,0,255)  
  
  fill(255,0,0); //sets fill color to red
  rect(width/2-wRect/2, 0, wRect, hRect);
  
  fill(0,0,255); //sets fill color to blue
  rect(bRPosX, bRPosY, wRect, hRect);
}

function keyPressed() {
  if (keyCode === 32){  //SPACE bar
    bRDirectionX *= -1;
  } else if (keyCode === UP_ARROW) {
    bRPosY -= yInc;
    lnPosY -= yInc;
    if (bRPosY < 0){
      bRPosY = 0;
      lnPosY = hRect/2;
    }
  } else if (keyCode === DOWN_ARROW) {
    bRPosY += yInc;
    lnPosY += yInc;
    if (bRPosY + hRect > height){
      bRPosY = height - hRect;
      lnPosY = height - hRect/2;
    }
  }
}

function mouseClicked() {
  // is mouse clicked within blue rectangle?
  let cX = bRPosX + wRect/2; //X position of center of blue rectangle
  let cY = bRPosY + hRect/2; //Y position of center of blue rectangle
  if ((abs(cX-mouseX) < wRect/2) && (abs(cY-mouseY) < hRect/2)){
    // check to see if blue rectangle is moving or stopped
    if (bRStopped === 0){ //moving then stop
      bRStopped = 1;
      noLoop();
    } else { //stopped now move
      bRStopped = 0;
      loop();
    }  	
    
  //if mouse is pressed outside blue box move center of box to mouseX,mouseY
  //and adjust upper corners of box and bottom end of line accordingly
  } else {
    bRPosX = mouseX - wRect/2;
    bRPosY = mouseY - hRect/2;
    lnPosY = mouseY;
    // if left side of box is moving past the left border of canvas
    // then it will be adjusted to be on the left border in which case
    // it will reverse direction
    if (bRPosX < 0){
      bRPosX = 0;
    } else if (bRPosX + wRect > width){
      //if right corner of box is moving past right border of canvas 
      // then adjust x position so that rectangle will be at the left of border
      // and will reverse direction
      bRPosX = width - wRect;
    }
    if (bRPosY < 0){
      bRPosY = 0;
      lnPosY = hRect/2;
    } else if (bRPosY + hRect > height){
      bRPosY = height - hRect;
      lnPosY = height - hRect/2;
    }
  }
}