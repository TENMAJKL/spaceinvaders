document.addEventListener("keydown", keyPush);
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const title = document.querySelector("h1");

var shipSpeed = 5;
var shipSize = 50;
var shipPosX = 0;

var backWards = false;

var start = false;

var shoot = false;
var shootPosX;

var shots = [];
var shotCount = 30;

var invadersBroken = [];
var invaders = [];

const tileCountX = canvas.width / shipSize;

title.textContent = 30

function gameLoop() {
  draw();
  if (start == true) {
    move();
    if (shotCount == 0) {
      setTimeout(function(){ shotCount = 30; }, 10000)
    }
  }
  requestAnimationFrame(gameLoop);
}
gameLoop()

function rectangle( color, posX, posY, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(posX, posY, width, height);
}

function draw() {
  rectangle("black", 0,0,canvas.width,canvas.height);
  rectangle("#2ecc71", shipPosX, canvas.height/1.5, shipSize, shipSize/2);
  if (shoot == true) {
    shots.forEach(shotDraw);
  }

  drawInvaders();
  }

  function shotDraw(x) {

    rectangle("#2ecc71", x[0] + shipSize/3, x[1], shipSize/4, shipSize);
    x[1] -= shipSpeed;
    if (invaders.includes([x[0], x[1]])) {
      invadersBroken.push([x[0], x[1]]);
    }
  }

  function move() {
        if (backWards == true) {
          shipPosX -= shipSpeed;
        } else {
          shipPosX += shipSpeed;
        }
        
        if (shipPosX + shipSize == canvas.width) {
          backWards = true;
          
        } else if (shipPosX == 0) {
          backWards = false;
        }
      }

      function keyPush(event) {
        switch (event.key) {
          case "ArrowRight":
            start = true;
            break;
          case "ArrowUp":
            addShot();
            shoot = true;
            break;
            
        }
      }

function addShot() {
  if (shotCount != 0 && start == true) {
    shots.push([shipPosX, canvas.height/1.5 - shipSize/2]);
    shotCount --;
    title.textContent = shotCount;
  }
}

function drawInvaders() {
	for (let i = 0; i < tileCountX; i++) {
		for (let j = 0; j < 3; j++) {
      if (invadersBroken.includes([shipSize * i, shipSize * j]) == false)
			rectangle(
				"#2ecc71",
				shipSize * i,
				shipSize * j,
				shipSize - 20,
				shipSize - 20
				);
      invaders.push([shipSize * i, shipSize * j]);
			}
		}
  }
