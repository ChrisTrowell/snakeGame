var xSnake = 1;
var ySnake = 1;
// Direction values are 1 or -1, and one must always be == 0
var xDir = 1;
var yDir = 0;

var gameScale = 15;
var isGameOver = false;

function setup() { // Runs once
	frameRate(60);
	createCanvas(500,500);

}

function draw() { // Runs constantly, at the framerate
	background(0);
	keyInput();
	moveSnake();
	drawSnake();
	drawHUD();
}




function keyInput(){
	if (keyIsPressed === true) {
		
		if(keyCode === UP_ARROW) {
			// Code to run when we press UP_ARROW
			xDir = 0;
			yDir = -1;
		} else if (keyCode === DOWN_ARROW) {
			xDir = 0;
			yDir = 1;
		} else if (keyCode === LEFT_ARROW) {
			xDir = -1;
			yDir = 0;
		} else if (keyCode === RIGHT_ARROW) {
			xDir = 1;
			yDir = 0;
		}

	}
}



function drawSnake() {
	push();
	fill(0,255,0);
	rect(xSnake*gameScale, ySnake*gameScale, gameScale, gameScale);
	pop();
}

function moveSnake(){
	var speedDivisor = 6;
	var xMax = Math.floor(width/gameScale);
	var yMax = Math.floor(height/gameScale);

	if (frameCount % speedDivisor == 0) {
		// gameOver on wall collision
		if ( (xSnake + xDir > xMax) || 
			 (xSnake + xDir < 0) ||
			 (ySnake + yDir > yMax) ||
			 (ySnake + yDir < 0) ) 
		{ // You are dead!
			gameOver();
		} else { // move normally if you haven't run into a wall
			xSnake = xSnake + xDir;
			ySnake = ySnake + yDir;		
		}
		
	}
}



function gameOver() {
	isGameOver = true;
}

function drawHUD() {
	
	if (isGameOver) {
		push();
		textSize(32);
		fill(200,100,100);
		text("Game Over! You Loose! Good day sir!",width/6,height/2, width*2/3, height/3);
		pop();
	}
}