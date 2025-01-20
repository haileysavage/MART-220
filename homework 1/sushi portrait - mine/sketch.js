function setup() {
  createCanvas(400, 400);
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
  fill(255, 150, 100);
  ellipse(200, 200, 80, 80);

  // Avocado slice
  fill(100, 200, 100);
  arc(200, 200, 60, 60, -HALF_PI, HALF_PI, PIE);

  // Fish roe
  fill(255, 100, 100);
  ellipse(180, 190, 10, 10);
  ellipse(220, 190, 10, 10);
  ellipse(200, 210, 10, 10);

  // Text label
  fill(0);
  textSize(20);
  textAlign(CENTER);
  text("Sushi Roll", 200, 350);
}
