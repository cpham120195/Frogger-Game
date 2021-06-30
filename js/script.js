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

//images
const background_lvl2 = new Image();
background_lvl2.src = 'background_lvl2.png';




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
    ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
    frogger.draw();
    frogger.update();
    handleObstacles();
    handleScoreboard();
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

//handle score
function handleScoreboard() {
    ctx4.fillStyle = 'black';
    ctx4.strokeStyle = 'black';
    ctx4.font = '15px Sans-serif';
    ctx4.strokeText('Score', 265, 15);
    ctx4.font = '60px Sans-serif';
    ctx4.fillText(score, 270, 65);
    ctx4.font = '15px Sans-serif';
    ctx4.strokeText('Game Speed: ' + gameSpeed, 10, 195);
}


//collision detection between rectangles

function collision(first, second) {
    return !( first.x > second.x + second.width ||
                first.x + first.width < second.x || 
                first.y > second.y + second.height ||
                first.y + first.height < second.y);
        //if any statements are true there is no collision
}

function resetGame() {
    frogger.x = canvas.width/2 - frogger.width/2;
    frogger.y = canvas.height - frogger.height - 40;
    score = 0;

}

//creating obstacle class for the cars 

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
        //moving cars will reset once it passes the grid 
        this.x += this.speed * gameSpeed;
        if(this.speed > 0) {
            if (this. x > canvas.width + this.width){
                this.x = 0 - this.width;
            }
        } else {
            if(this.x < 0 - this.width) {
                this.x = canvas.width + this.width;
            }
        }
       
    }
}


//creating moving cars 
function initObstacles() {
    //lane1
    for(let i = 0; i < 2; i++) {
        let x = i * 350;
        carsArray.push(new Obstacle(x, canvas.height - grid * 2 -20, grid * 2, grid, 1, 'car'));
    };


    //lane 2
    for(let i = 0; i < 2; i++) {
        let x = i * 300;
        carsArray.push(new Obstacle(x, canvas.height - grid * 3 - 20, grid * 2, grid, -2, 'car'));
    }

    //lane 3

    for(let i = 0; i < 2; i++) {
        let x = i * 400;
        carsArray.push(new Obstacle(x, canvas.height - grid * 4 - 20, grid * 2, grid, 3, 'car'));
    }

    //lane 4

    for(let i = 0; i < 2; i++) {
        let x = i * 400;
        logsArray.push(new Obstacle(x, canvas.height - grid * 5 - 20, grid * 2 , grid, -2, 'log'));
    }


    //lane 5

    for(let i = 0; i < 3; i++) {
        let x = i * 200;
        logsArray.push(new Obstacle(x, canvas.height - grid * 6 - 20, grid, grid, 1, 'turtle'));
    }



}
initObstacles();

function handleObstacles() {
    for(let i = 0; i < carsArray.length; i++) {
        carsArray[i].update();
        carsArray[i].draw();
        
    }
    for(let i = 0; i < logsArray.length;i++) {
        logsArray[i].update();
        logsArray[i].draw();
    }
    //collision with car
    for(let i = 0; i < carsArray.length; i++) {
        if (collision(frogger, carsArray[i])) {
            resetGame();
        }
    }
}
