// Global Variables
let idleFrames = [];
let moveFrames = [];
let currentAnimation = "idle";  // 'idle' or 'move'
let frameIndex = 0;
let animationSpeed = 200; // ms between frames
let lastFrameChange = 0;

let character;
let food;

let characterSpeed = 4; // Movement speed

// Score and Timer variables
let score = 0;
let gameTime = 60; // in seconds
let startTime;

function preload() {
  // Load character idle animation frames
  idleFrames.push(loadImage("images/character_idle1.png"));
 idleFrames.push(loadImage("images/character_idle2.png"));


  // Load character move animation frames
  moveFrames.push(loadImage("images/character_move1.png"));
  moveFrames.push(loadImage("images/character_move2.png"));

  // Load the single sushi image for food
  sushiImage = loadImage("images/sushi.png");
}

function setup() {
  createCanvas(800, 600);
  // Create a character in the middle-bottom of the canvas
  character = new Character(width / 2, height - 120);
  food = new Food();
  
  // Record the starting time (in milliseconds)
  startTime = millis();
}

function draw() {
  background(220);

  // Update timer
  let elapsedTime = (millis() - startTime) / 1000;
  let remainingTime = max(0, gameTime - elapsedTime);

  // End game if time is up
  if (remainingTime <= 0) {
    noLoop();
    fill(0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Game Over!\nScore: " + score, width/2, height/2);
    return;
  }

  // Determine if the character is moving (arrow key pressed) or idle
  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || 
      keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
    currentAnimation = "move";
    character.move();
  } else {
    currentAnimation = "idle";
  }

  // Display character with appropriate animation
  character.display();

  // Display food
  food.display();

  // Check for collision between character and food
  if (food.checkCollision(character.x, character.y)) {
    score++;          // Increase score when food is collected
    food.respawn();   // Respawn the food immediately
  }
  
  // Occasionally move the food randomly at random times
  food.randomMovement();

  // Update animation frame based on timer
  if (millis() - lastFrameChange > animationSpeed) {
    frameIndex = (frameIndex + 1) % (currentAnimation === "idle" ? idleFrames.length : moveFrames.length);
    lastFrameChange = millis();
  }

  // Display score and timer
  displayHUD(score, remainingTime);
}

function displayHUD(score, timeRemaining) {
  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("Time Left: " + nf(timeRemaining, 1, 1) + " sec", 10, 30);
}

// Character Class
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= characterSpeed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += characterSpeed;
    }
    if (keyIsDown(UP_ARROW)) {
      this.y -= characterSpeed;
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.y += characterSpeed;
    }
    // Constrain character within canvas
    this.x = constrain(this.x, 0, width - 100);
    this.y = constrain(this.y, 0, height - 100);
  }
  
  display() {
    let img;
    if (currentAnimation === "idle") {
      img = idleFrames[frameIndex];
    } else {
      img = moveFrames[frameIndex];
    }
    // Draw the character (adjust size as needed)
    image(img, this.x, this.y, 100, 100);
  }
}

// Food Class
class Food {
  constructor() {
    this.respawn();
    this.lastRandomMove = millis();
    // random interval between 2 and 5 seconds for movement
    this.randomInterval = random(2000, 5000);
  }
  
  // Respawn food at a random location
  respawn() {
    this.x = random(50, width - 150);
    this.y = random(50, height - 150);
    this.img = sushiImage;
  }
  
  display() {
    image(this.img, this.x, this.y, 100, 100);
  }
  
  checkCollision(charX, charY) {
    // Use a simple distance based collision detection
    let d = dist(charX, charY, this.x, this.y);
    return d < 75; // Adjust collision threshold if necessary
  }
  
  // Move food randomly at random times
  randomMovement() {
    if (millis() - this.lastRandomMove > this.randomInterval) {
      // Choose a new random position
      this.x = random(50, width - 150);
      this.y = random(50, height - 150);
      // Reset timer and choose a new random interval
      this.lastRandomMove = millis();
      this.randomInterval = random(2000, 5000);
    }
  }
}
