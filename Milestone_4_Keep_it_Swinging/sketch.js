// Milestone 4. Keep it Swinging

//initialize canvas
let w = 800; //width of canvas
let h = 400; //height of canvas
let leftEdge; //left edge (X) of canvas where blue rect should reverse directions 
let rightEdge; //right edge (X) of canvas where blue rect should reverse directions

//initialize button for toggling between the interactive scenario (left-right) or
//pendulum scenario. Left-right is the default -- note: instead of 2 buttons
//this version uses only one and toggles the label
let buttonPos; // vectors representing centers of left-right and pendulum buttons
let buttonTextPos; //vectors with starting positions for text 
let buttonText; // button text labels
let textW = 120; // width of button text labels 
let textH = 20; // height of button text labels
let buttonSpace; // spacing of toggle buttons
let scenario; //set to either 'left-right' (default) or 'pendulum'
let buttonClick = 0; //indicates whether button clicked to change scenarios

//initialize blue (moving) and red (stationary) rectangles
let wRect = 50; //width of rectangle - same for blue and red
let hRect = 50; //h of rectangle - same for blue and red
let rRectPos; //vector representing x,y loc of center of red rectangle
let bRectPos; //vector representing x,y loc of center of blue rectangle
let bRectDirX = 1; //direction blue rectangle is moving (right=1/left=-1)
let bRectSpeedX = 1; //speed at which blue rectangle is moving
let bRectStopped = 0; //flag to indicate whether blue rect stopped (1) or not (0) by mouse click
let yInc = 3; //when UP_ARROW or DOWN_ARROW is pressed Y position of center of blue rectangle moved up or down yInc

//initialize line connecting red and blue. Beginning of line is always
//at the center of the red rectangle and end of line is attached to center
//of the moving blue rectangle
let lnBegPos; //vector representing beginning of line - center of red rectangle
let lnEndPos; //vector representing end of line - center of blue rectangle

//initialize pendulum angles, forces and movements
let angle;
let angleV = 0;
let angleA = 0;
let armLen; // length of pendulum arm -- in this case length of line connecting red & blue rectangles
let origin; //vector of origin point -- in this case the center of the red rectangle
let force; //force = mass x acceleration
let gravity = 1; //this represents the mass
let pRectPos; //center of blue rectangle representing pendulum 'bob'

function setup() {
  createCanvas(w, h);
  leftEdge = 0;
  rightEdge = w - wRect/2;
  
  rectMode(CENTER);
  rRectPos = createVector(w/2, hRect/2);
  bRectPos = createVector(wRect/2, h/2);
  lnBegPos = createVector(w/2,hRect/2);
  lnEndPos = createVector(wRect/2, h/2);
  
  // initialize toggle button
  textSize(10);
  //scenario = 'left-right';
  scenario = 'left-right';
  buttonSpace = buttonSpace = int(0.75 * w);
  buttonPos = createVector(buttonSpace, 0.05 * h); //center button;
  buttonText = 'scenario: ' + scenario;
  buttonTextPos = createVector(buttonPos.x - 40, 0.06 * h); //40 & .06 are guesses
  
  // initialize pendulum
  origin = createVector(w/2, hRect/2);
  pRectPos = createVector(0,0);
  armLen = h/2;
  //angles measured in radians - PI/4 radians = 45 degrees
  //this angle controls the total angular distance the pendulum moves
  angle = PI / 4;
}

function draw() {
  //set the background of the canvas to light gray
  background(220);
  displayButton(buttonPos, buttonText, buttonTextPos, textW, textH);
  
  if (scenario === 'left-right'){
      displayInstructions();
  }
  
  if (scenario === 'left-right'){
    displayInteraction();
  } else {
    displayPendulum();
  }
}

function displayButton(buttonVec, buttonText, buttonTextPos, textW, textH){
  stroke(255);
  fill(0);
  rect(buttonVec.x, buttonVec.y, textW, textH);
  noStroke();
  fill(255);
  text(buttonText, buttonTextPos.x, buttonTextPos.y);
  noStroke();
  fill(0);
  text('Click to change scenario', buttonTextPos.x - 10, buttonTextPos.y + 20);
}

function displayInstructions(){ //these only appear with left-right scenario
  fill(0);
  text("Instructions:", 5, 15);
  text("Press the space bar to reverse the blue rectangles movement", 5, 30);
  text("Press the up arrow to slowly move the blue rectangle up", 5, 45);
  text("Press the down arrow to slowly move the blue rectangle down", 5, 60);
  text("Click the blue rectangle to pause the animation. Click it again to resume.", 5, 75);
  text("Click the screen anywhere will move the blue rectangle to that height", 5, 90);
}

function displayInteraction(){
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

function displayPendulum(){
  force = gravity * sin(angle);
  angleA = (-1 * force) / armLen;
  angleV += 0.05 * angleA;
  angle += angleV;
  angleV *= 1.0; // if less then 1 (say 0.999) the pendulum comes to eventual stop

  pRectPos.x = armLen * sin(angle) + origin.x;
  pRectPos.y = armLen * cos(angle) + origin.y;

  stroke(0);
  
  line(origin.x, origin.y, pRectPos.x, pRectPos.y);
  
  // red rectangle - anchor
  fill(255,0,0)
  rect(origin.x, origin.y, wRect, hRect);
  
  // swinging blue rectangle 
  fill(0,0,255);
  rect(pRectPos.x, pRectPos.y , 50,50);
  
  textSize(10);
  let strpRectPosX = 'x: ' + int(pRectPos.x).toString();
  let strpRectPosY = 'y: ' + int(pRectPos.y).toString();
  text(strpRectPosX,pRectPos.x-25,pRectPos.y + 40);
  text(strpRectPosY,pRectPos.x-25,pRectPos.y + 50)
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
  // is mouse clicked in button:
  if ((abs(mouseX-buttonPos.x) < textW/2) && (abs(mouseY-buttonPos.y) < textH/2)){
     if (scenario === 'left-right'){
       scenario = 'pendulum';
     } else {
       scenario = 'left-right';
       bRectPos.x = wRect/2;
       bRectPos.y = h/2;
       lnEndPos.x = wRect/2;
       lnEndPos.y = h/2;
     }
     buttonText = 'scenario: ' + scenario;
     buttonClick = 1;
  }
  if (buttonClick != 1){
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
      if (bRectPos.y - hRect/2 < 0){
        bRectPos.y = hRect/2;
        lnEndPos.y = hRect/2;
      } else if (bRectPos.y + hRect/2 > h){
        bRectPos.y = h - hRect/2;
        lnEndPos.y = h - hRect/2;
      }
    }
  }
  buttonClick = 0;
}
