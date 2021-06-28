const canvas = document.getElementById('canvas1');
const ctx1 = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const canvas2 = document.getElementById('canvas2');
const ctx2 = canvas.getContext('2d');
canvas2.width = 600;
canvas2.height = 600;

const canvas3 = document.getElementById('canvas3');
const ctx3 = canvas.getContext('2d');
canvas3.width = 600;
canvas3.height = 600;

const canvas4 = document.getElementById('canvas4');
const ctx4 = canvas.getContext('2d');
canvas4.width = 600;
canvas4.height = 600;

const canvas5 = document.getElementById('canvas5');
const ctx5 = canvas.getContext('2d');
canvas5.width = 600;
canvas5.height = 600;


// global variables
const grid = 80; //80 * 80 pixels
let keys = []; //holding the keys press on keybaord
score = 0; //score starting at 0
let collisionCount = 0;
let frame = 0; 
let gameSpeed = 1; //game speed increases when scored

const particleArray = []; 
const maxParticles = 300; 
const rippleArray = [];
const carsArray = [];
const logsArray = [];


class Frogger {
    constructor() {
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth / 5;
        this.height = this.spriteHeight / 5;

        //x and y coordinates where frog appears
        this.x = canvas.width/ 2 - this.width/ 2;
        this.y = canvas.height - this.height - 40;
        this.moving = false;
        this.frameX = 0;
        this.frameY = 0;
    }
    update() {
        if(keys[38]) { //up movement
            if (this.moving === false) {
                this.y -= grid;
                this.moving = true;
            }

        }
        if(keys[40]) { //down movement
            if(this.moving === false && this.y < canvas.height - this.height * 2) {
                this.y += grid;
                this.moving = true;

            }
         
         }

         if(keys[37]) { //left movement 
            if(this.moving === false && this.x > this.width){
                this.x -= grid;
                this.moving = true;
            }
         
         }

         if(keys[39]) { //right movement 
            if(this.moving === false && this.x < canvas.width - this.width * 2) {
                this.x += grid;
                this.moving = true;
            }
         
         }
         //if player goes and scores

         if (this.y < 0) scored();
    
}
    draw() {
        ctx3.fillStyle = 'green';
        ctx3.fillRect(this.x, this.y, this.width, this.height);
    }
    jump() {
        // console.log('jump');
    }
};

const frogger = new Frogger();


//custom function for animation

function animate() {
    ctx3.clearRect(0,0, canvas.width, canvas.height);
    frogger.draw();
    frogger.update();
    handleObstacles();
    requestAnimationFrame(animate);
}

animate();

//event listeners

window.addEventListener('keydown', function(e) {
    keys = [];
    keys[e.keyCode] = true;
    if (keys[37] || keys[38] || keys[39] || keys[40]) { //arrow keys 
        frogger.jump();

    }
});

window.addEventListener('keyup', function(e) {
    delete keys[e.keyCode];
    frogger.moving = false;
})

//create score function
function scored() {
    score++; //add score by 1 if player wons
    gameSpeed += 0.05;
    //reset the frog
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
}


//creating obstacle class

class Obstacle {
    constructor(x, y, width, height, speed, type) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.type = type;
    }
    draw() {
        ctx1.fillStyle = 'red';
        ctx1.fillRect(this.x, this.y, this.width, this.height);
    }
    update() {
        this.x += this.speed * gameSpeed;
        if(this.x > canvas.width + this.width) {
            this.x = 0 - this.width;
        };
    }
}

function initObstacles() {
    //lane1
    for(let i = 0; i < 2; i++) {
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 -20, grid, grid, 1, 'car'));
    }
}
initObstacles();

function handleObstacles() {
    for(let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
    }
}