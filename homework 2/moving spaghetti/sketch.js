let plateX, plateY, plateSize;
let meatballX, meatballY, meatballSize;
let spaghettiColor;

function setup() {
  createCanvas(600, 400);
  textAlign(CENTER, CENTER);
  
  // Initial positions and sizes
  plateX = width / 2;
  plateY = height / 1.5;
  plateSize = 200;
  
  meatballSize = 40;
  meatballX = plateX - 50; 
  meatballY = plateY - 20;
  
  spaghettiColor = color(255, 221, 51); // Light yellow for spaghetti
  
  // Background color
  background(220);
}

function draw() {
  // Clear the canvas with the background color
  background(220);
  
  // Title and name
  fill(0);
  textSize(20);
  text("Spaghetti and Meatballs", 10, 30); // Title at top left
  textSize(12);
  text("Created by Your Name", width - 100, height - 10); // Name at bottom right
  
  // Draw the plate
  fill(255);
  ellipse(plateX, plateY, plateSize, plateSize);
  
  // Draw the spaghetti (lines representing noodles)
  drawSpaghetti(plateX, plateY);
  
  // Draw the meatballs
  fill(139, 69, 19); // Brown color for meatballs
  ellipse(meatballX, meatballY, meatballSize, meatballSize);
  ellipse(plateX + 50, plateY - 30, meatballSize, meatballSize); // Another meatball
  
  // Random movement of meatballs when spacebar is pressed
  if (keyIsPressed && key === ' ') {
    meatballX = random(plateX - 50, plateX + 50); 
    meatballY = random(plateY - 50, plateY + 50); 
  }
  
  // Mouse click moves the food to a new position
  if (mouseIsPressed) {
    plateX = mouseX;
    plateY = mouseY;
  }
}

function keyPressed() {
  // When a key is pressed, change spaghetti color
  spaghettiColor = color(random(255), random(255), random(255));
}

// Function to draw spaghetti lines (representing noodles)
function drawSpaghetti(x, y) {
  stroke(spaghettiColor);
  strokeWeight(3);
  
  for (let i = 0; i < 15; i++) {
    // Random spaghetti line directions and positions
    let angle = random(TWO_PI);
    let length = random(50, 100);
    let spaghettiX = x + cos(angle) * length;
    let spaghettiY = y + sin(angle) * length;
    
    line(x, y, spaghettiX, spaghettiY);
  }
}
