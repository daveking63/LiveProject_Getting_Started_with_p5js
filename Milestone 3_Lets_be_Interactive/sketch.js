//Milestone 3 - Let's Be Interactive

//initialize for left-right objects
let w = 400;
let h = 400;
let wRect = 50; //width of rectangle - same for blue and red
let hRect = 50; //h of rectangle - same for blue and red

let rRectPos; //vector representing x,y loc of center of red rectangle
let bRectPos; //vector representing x,y loc of center of blue rectangle
let bRectDirX = 1; //direction blue rectangle is moving (right=1/left=-1)
let bRectSpeedX = 1; //speed at which blue rectangle is moving

let lnBegPos; //vector representing beginning of line - center of red rectangle
let lnEndPos; //vector representing end of line - center of blue rectangle

let yInc = 3; //when up and down arrows pressed Y position moved up or down yInc

let leftEdge = 0; //left edge (X) of canvas where blue rect should reverse directions 
let rightEdge; //right edge (X) of canvas where blue rect should reverse directions

let bRectStopped = 0; //flag to indicate whether blue rect stopped (1) or not (0) by mouse click

function setup() {
  createCanvas(w, h);
  rightEdge = w - wRect/2
  bRectPos = createVector(wRect/2, h/2);
  rRectPos = createVector(w/2, hRect/2);
  lnEndPos = createVector(0,0);
  lnBegPos = createVector(0,0);
  rectMode(CENTER);
}

function draw() {
  //set the background of the canvas to light gray
  background(220);
  
  //Test to see if the blue rectangle exceeds the boundaries of the canvas
  //If it does, reverse its direction by multiplying by -1
  
  if (bRectPos.x < leftEdge + wRect/2 || bRectPos.x > rightEdge) {
    bRectDirX *= -1;
  }
  
  //update x position (center) of blue rectangle
  bRectPos.x = bRectPos.x + bRectSpeedX * bRectDirX;
  
  //'stroke' sets the color used to draw lines and borders around shapes
  //in this case the color is black = 0
  
  stroke(0);
  
  //In this case the line connecting the two centers of the rectangles
  //is drawn behind the rectangles.
  lnBegPos.x = rRectPos.x;
  lnBegPos.y = rRectPos.y;
  lnEndPos.x = bRectPos.x;
  lnEndPos.y = bRectPos.y;
  line(lnBegPos.x, lnBegPos.y, lnEndPos.x, lnEndPos.y);
  
  //'Fill' sets the color used to fill shapes
  //Here the two shapes are rectangles (rect).
  //One is set to red (255,0,0) and the other to blue(0,0,255)  
  
  fill(255,0,0); //sets fill color to red
  rect(rRectPos.x, rRectPos.y, wRect, hRect);
  
  fill(0,0,255); //sets fill color to blue
  rect(bRectPos.x, bRectPos.y, wRect, hRect);
}

function keyPressed() {
  if (keyCode === 32){  //SPACE bar
    bRectDirX *= -1;
  } else if (keyCode === UP_ARROW) {
    bRectPos.y -= yInc;
    lnEndPos.y -= yInc;
    
    if ((bRectPos.y - hRect/2) < 0){
      bRectPos.y = hRect/2;
      lnEndPos.y = hRect/2;
    }
  } else if (keyCode === DOWN_ARROW) {
    bRectPos.y += yInc;
    lnEndPos.y += yInc;
    if ((bRectPos.y + hRect/2) > h){
      bRectPos.y = h - hRect/2;
      lnEndPos.y = h - hRect/2;
  }
 }
}

function mouseClicked() {
  // is mouse clicked within blue rectangle?
  let cX = bRectPos.x; //X position of center of blue rectangle
  let cY = bRectPos.y; //Y position of center of blue rectangle
  
  if ((abs(mouseX-cX) < wRect/2) && (abs(mouseY-cY) < hRect/2)){
    // check to see if blue rectangle is moving or stopped
    if (bRectStopped === 0){ //moving then stop
      bRectStopped = 1;
      noLoop();
    } else { //stopped now move
      bRectStopped = 0;
      loop();
    }  	
    
  //if mouse is pressed outside blue box move center of box to mouseX,mouseY
  //and adjust upper corners of box and bottom end of line accordingly
  } else {
    bRectPos.x = mouseX;
    bRectPos.y = mouseY;
    lnEndPos.y = mouseY;
    // if left side of box is moving past the left border of canvas
    // t(hen it will be adjusted to be on the left border in which case
    // it will reverse direction
    if ((bRectPos.x - wRect/2) < 0){
      bRectPos.x = wRect/2;
    } else if ((bRectPos.x + wRect/2) > w){
      //if right corner of box is moving past right border of canvas 
      // then adjust x position so that rectangle will be at the left of border
      // and will reverse direction
      bRectPos.x = w - wRect/2;
    }
    if (bRectPos.y < 0){
      bRectPos.y = 0;
      lnEndPos.y = hRect/2;
    } else if (bRectPos.y + hRect/2 > h){
      bRectPos.y = h - hRect/2;
      lnEndPos.y = h - hRect/2;
    }
  }
}