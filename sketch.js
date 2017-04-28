var xSnake = 1;
var ySnake = 1;
// Direction values are 1 or -1, and one must always be == 0
var xDir = 1;
var yDir = 0;
var sizeSnake = 1;

var xTail = [];
var yTail = [];

var xFood;
var yFood;

var gameScale = 15;
var isGameOver = false;
var finalScore = 0;
var xMax;
var yMax;

function setup() { // Runs once
	frameRate(60);
	createCanvas(500,500);
	xMax = Math.floor(width/gameScale);
	yMax = Math.floor(height/gameScale);
	createFood();

}

function draw() { // Runs constantly, at the framerate
	background(0);
	keyInput();
	moveSnake();
	drawFood();
	drawTail();
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

	if (frameCount % speedDivisor == 0) {
		// gameOver on wall collision
		if ( (xSnake + xDir > xMax) || 
			 (xSnake + xDir < 0) ||
			 (ySnake + yDir > yMax) ||
			 (ySnake + yDir < 0) || 
			 isTailHit(xSnake + xDir, ySnake + yDir) ) 
		{ // You are dead!
			gameOver();
		} else { // move normally if you haven't run into a wall
			updateTail();
			xSnake = xSnake + xDir;
			ySnake = ySnake + yDir;		
		}

		// Check if we are on the food
		if ( (xSnake == xFood) && (ySnake == yFood) ) {
			eatFood();
		}
		
	}
}



function gameOver() {
	if (isGameOver == false) { // Only set final score once.
		finalScore = sizeSnake;
	}
	isGameOver = true;
}

function drawHUD() {

	push();
	textSize(22);
	fill(200,200,200);
	text("Score: " + sizeSnake ,20,20);
	pop();


	if (isGameOver) {
		push();
		textSize(32);
		fill(200,100,100);
		text("Game Over! You Loose! Good day sir!" + "  Final Score: " + finalScore
			,width/6,height/2, width*2/3, height/3);
		pop();
	} 
}

function createFood() {
	xFood = Math.floor(Math.random()*xMax);
	yFood = Math.floor(Math.random()*yMax);
}

function drawFood() {
	push()
	fill(100,100,255);
	rect(xFood*gameScale, yFood*gameScale, gameScale, gameScale);
	pop()
}

function eatFood() {
	sizeSnake = sizeSnake + 1;
	createFood();
	createTail();
}


function createTail() {
	if(sizeSnake > 1) {
		// Add body segments until correct length
		while( xTail.length < sizeSnake - 1) {
			xTail.unshift(xSnake);
			yTail.unshift(ySnake);
		}
	}
}


function updateTail() {
	if(sizeSnake > 1) {

		if(xTail.length == yTail.length) {

			for (let i = xTail.length-1; i>0; --i) {
				xTail[i] = xTail[i-1];
				yTail[i] = yTail[i-1];
			}

			xTail[0] = xSnake;
			yTail[0] = ySnake;


		}

	}
}


function drawTail() {
	if (xTail.length > 0 && xTail.length == yTail.length) {
		for (let i = 0; i<xTail.length;  ++i) {
			push();
			fill(230,180, 50); // orange?
			rect(xTail[i] * gameScale, yTail[i] * gameScale, gameScale, gameScale);
			pop();
		}
	}
}

function isTailHit(xPos,yPos) {
	isHit = false; // Initial Assumption

	for (let i = 0; i<xTail.length; ++i) {
		if (xTail[i] == xPos && yTail[i] == yPos) {
			isHit = true;
		}
	}
	return isHit;
}

