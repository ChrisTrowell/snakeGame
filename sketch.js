var xSnake = 1;
var ySnake = 1;
// Direction values are 1 or -1, and one must always be == 0
var xDir = 1;
var yDir = 0;

var gameScale = 15;

function setup() { // Runs once
	frameRate(60);
	createCanvas(500,500);

}

function draw() { // Runs constantly, at the framerate
	background(0);
	moveSnake();
	drawSnake();
}




function keyInput(){
	if (keyIsPressed === true) {
		
		if(keyCode === UP_ARROW) {
			// Code to run when we press UP_ARROW
			// player.move(0,-5)
		} else if (keyCode === DOWN_ARROW) {
			// player.move(0,5)
		} 


		if (keyCode === LEFT_ARROW) {
			// player.move(-5,0)
		} else if (keyCode === RIGHT_ARROW) {
			// player.move(5,0)
		}

	}
}



function drawSnake() {
	fill(0,255,0);
	rect(xSnake*gameScale, ySnake*gameScale, gameScale, gameScale);
}

function moveSnake(){
	if (frameCount % 6 == 0) {
		xSnake = xSnake + xDir;
		ySnake = ySnake + yDir;	
	}
	
}