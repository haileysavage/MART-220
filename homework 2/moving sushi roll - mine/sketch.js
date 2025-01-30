let fishRoe = [];
let salmonColor;

function setup() {
  createCanvas(400, 400);
  background(220);
  
  // Initialize fish roe
  fishRoe.push(new Roe(180, 190));
  fishRoe.push(new Roe(220, 190));
  fishRoe.push(new Roe(200, 210));

  // Initial salmon color
  salmonColor = color(255, 150, 100);
}

function draw() {
  background(220);

  // Plate
  fill(230);
  ellipse(200, 200, 300, 300);

  // Nori (seaweed)
  fill(50, 100, 50);
  rect(140, 140, 120, 120, 20);

  // Rice
  fill(255);
  ellipse(200, 200, 100, 100);

  // Salmon topping
  fill(salmonColor);
  ellipse(200, 200, 80, 80);

  // Avocado slice
  fill(100, 200, 100);
  arc(200, 200, 60, 60, -HALF_PI, HALF_PI, PIE);

  // Fish roe (dynamic)
  for (let roe of fishRoe) {
    roe.move();
    roe.display();
  }

  // Text labels
  fill(0);
  textSize(16);
  textAlign(LEFT);
  text("Interactive Sushi Roll", 20, 20);
  
  textSize(12);
  textAlign(RIGHT);
  text("Hailey Savage", width - 10, height - 10);
}

// Roe class
class Roe {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move() {
    // Slight random movement
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    fill(255, 100, 100);
    ellipse(this.x, this.y, 10, 10);
  }
}

// Mouse click adds new fish roe
function mousePressed() {
  fishRoe.push(new Roe(mouseX, mouseY));
}

// Key press changes salmon color
function keyPressed() {
  salmonColor = color(random(200, 255), random(100, 200), random(50, 150));
}
