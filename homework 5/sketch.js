let characterFrames = [];
let character;
let food;
let frameIndex = 0;
let animationSpeed = 200; // Change frame every 200ms
let lastFrameChange = 0;
let characterSpeed = 3; // Movement speed

let sushiImage; 

function preload() {
  // Load character frames
  for (let i = 1; i <= 6; i++) {
    characterFrames.push(loadImage(`images/character${i}.png`));
  }
  
  // Load the single sushi image
  sushiImage = loadImage(`images/sushi.png`); 
}

function setup() {
  createCanvas(800, 600);
  character = new Character(width / 2, height - 100);
  food = new Food();
}

function draw() {
  background(220);

  // Move character based on key input
  character.move();

  // Display character with animation
  character.display();

  // Display sushi
  food.display();

  // Check for collision between character and food
  if (food.checkCollision(character.x, character.y)) {
    food.respawn(); // Move food to a new random location
  }

  // Update animation frame based on timer
  if (millis() - lastFrameChange > animationSpeed) {
    frameIndex = (frameIndex + 1) % characterFrames.length;
    lastFrameChange = millis();
  }
}

// Character class with movement
class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  // Handle keyboard input for movement
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
    
    // Keep character within canvas boundaries
    this.x = constrain(this.x, 0, width - 100);
    this.y = constrain(this.y, 0, height - 100);
  }

  display() {
    image(characterFrames[frameIndex], this.x, this.y, 100, 100);
  }
}

// Food class for the sushi item
class Food {
  constructor() {
    this.respawn();
  }

  // Randomize food's position using a simple function
  respawn() {
    this.x = random(50, width - 50);
    this.y = random(50, height - 50);
    // Since we're only using one sushi image, we just assign it
    this.img = sushiImage;
  }

  display() {
    image(this.img, this.x, this.y, 100, 100);
  }

  // Simple collision detection based on distance threshold
  checkCollision(charX, charY) {
    let d = dist(charX, charY, this.x, this.y);
    return d < 75;
  }
}
