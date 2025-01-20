function setup() {
  createCanvas(400, 400);
  background(255); // white background for the canvas

  // Draw the plate
  fill(200, 200, 255); // Light blue color for the plate
  ellipse(200, 300, 300, 100); // Plate - an ellipse

  // Draw the spaghetti noodles (random curves or lines for the spaghetti)
  fill(255, 255, 0); // Yellow color for spaghetti
  noStroke();
  for (let i = 0; i < 30; i++) {
    let x = random(150, 250);
    let y = random(250, 320);
    ellipse(x, y, 20, 5); // Small ellipses to simulate spaghetti
  }

  // Draw the meatballs
  fill(139, 69, 19); // Brown color for meatballs
  for (let i = 0; i < 4; i++) {
    let x = random(150, 250);
    let y = random(250, 300);
    ellipse(x, y, 30, 30); // Meatballs as circles
  }

  // Optional: Add a sprinkle of grated cheese on top of spaghetti (small circles)
  fill(255, 255, 255, 150); // Light yellowish-white color for cheese
  for (let i = 0; i < 50; i++) {
    let x = random(150, 250);
    let y = random(250, 300);
    ellipse(x, y, 5, 5); // Small ellipses for cheese particles
  }
}

function draw() {
  // Nothing to animate here, so we can leave the draw function empty
}
