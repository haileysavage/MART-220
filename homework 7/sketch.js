// Global Variables
let idleFrames = [];
let moveFrames = [];
let currentAnimation = "idle";  // 'idle' or 'move'
let frameIndex = 0;
let animationSpeed = 200; // ms between frames
let lastFrameChange = 0;

let character;
let foodGood, foodBad;

let characterSpeed = 4; // Movement speed

// Score, Health, and Timer variables
let score = 0;
let health = 3; // Player starts with 3 health points
let gameTime = 60; // Game duration in seconds
let startTime;
let gameOver = false;

// Sound Variables
let bgMusic, eatGoodSound, eatBadSound;
let musicPlaying = false;

// Button for background music
let playButton;

function preload() {
  // Load character idle animation frames
  idleFrames.push(loadImage("images/character_idle1.png"));
  idleFrames.push(loadImage("images/character_idle2.png"));

  // Load character move animation frames
  moveFrames.push(loadImage("images/character_move1.png"));
  moveFrames.push(loadImage("images/character_move2.png"));

  // Load images for food
  sushiImage = loadImage("images/sushi.png");      // Good food
  badFoodImage = loadImage("images/bad_food.png"); // Bad food

  // Load sounds
  bgMusic = loadSound("sounds/background.mp3");
  eatGoodSound = loadSound("sounds/eat_good.mp3");
  eatBadSound = loadSound("sounds/eat_bad.mp3");
}

function setup() {
  createCanvas(800, 600);
  
  // Create character and food objects
  character = new Character(width / 2, height - 120);
  foodGood = new Food(sushiImage, "good");
  foodBad = new Food(badFoodImage, "bad");
  
  // Record the start time
  startTime = millis();
  
  // Create a button to start background music
  playButton = createButton("Play Music");
  playButton.position(20, height + 10);
  playButton.mousePressed(toggleMusic);
}

function draw() {
  background(220);

  if (gameOver) {
    displayGameOver();
    return;
  }

  // Update timer
  let elapsedTime = (millis() - startTime) / 1000;
  let remainingTime = max(0, gameTime - elapsedTime);

  // End game if time is up or health is zero
  if (remainingTime <= 0 || health <= 0) {
    gameOver = true;
    return;
  }

  // Determine animation state
  if (keyIsDown(LEFT_ARROW) || keyIsDown(RIGHT_ARROW) || 
      keyIsDown(UP_ARROW) || keyIsDown(DOWN_ARROW)) {
    currentAnimation = "move";
    character.move();
  } else {
    currentAnimation = "idle";
  }

  // Display character
  character.display();

  // Display and check collisions for both good and bad food
  foodGood.display();
  foodBad.display();

  if (foodGood.checkCollision(character.x, character.y)) {
    score++;
    eatGoodSound.play();
    foodGood.respawn();
  }

  if (foodBad.checkCollision(character.x, character.y)) {
    health--;
    eatBadSound.play();
    foodBad.respawn();
  }

  // Move food randomly
  foodGood.randomMovement();
  foodBad.randomMovement();

  // Update animation frame
  if (millis() - lastFrameChange > animationSpeed) {
    frameIndex = (frameIndex + 1) % (currentAnimation === "idle" ? idleFrames.length : moveFrames.length);
    lastFrameChange = millis();
  }

  // Display score, health, and timer
  displayHUD(score, health, remainingTime);
}

function displayHUD(score, health, timeRemaining) {
  fill(0);
  textSize(18);
  textAlign(LEFT, TOP);
  text("Score: " + score, 10, 10);
  text("Health: " + health, 10, 30);
  text("Time Left: " + nf(timeRemaining, 1, 1) + " sec", 10, 50);
}

function displayGameOver() {
  fill(0);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Game Over!\nScore: " + score, width / 2, height / 2);
}

// Function to toggle background music
function toggleMusic() {
  if (!musicPlaying) {
    bgMusic.loop();
    musicPlaying = true;
    playButton.html("Stop Music");
  } else {
    bgMusic.stop();
    musicPlaying = false;
    playButton.html("Play Music");
  }
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
    this.x = constrain(this.x, 0, width - 100);
    this.y = constrain(this.y, 0, height - 100);
  }
  
  display() {
    let img = currentAnimation === "idle" ? idleFrames[frameIndex] : moveFrames[frameIndex];
    image(img, this.x, this.y, 100, 100);
  }
}

// Food Class
class Food {
  constructor(image, type) {
    this.image = image;
    this.type = type; // "good" or "bad"
    this.respawn();
    this.lastRandomMove = millis();
    this.randomInterval = random(2000, 5000);
  }
  
  respawn() {
    this.x = random(50, width - 150);
    this.y = random(50, height - 150);
  }
  
  display() {
    image(this.image, this.x, this.y, 100, 100);
  }
  
  checkCollision(charX, charY) {
    // Use p5.collide2D for accurate collision detection
    return collideRectRect(charX, charY, 100, 100, this.x, this.y, 100, 100);
  }

  randomMovement() {
    if (millis() - this.lastRandomMove > this.randomInterval) {
      this.x = random(50, width - 150);
      this.y = random(50, height - 150);
      this.lastRandomMove = millis();
      this.randomInterval = random(2000, 5000);
    }
  }
}

