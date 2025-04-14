let heart;
let textures = [];
let shapes = [];
let positions = [];

function preload() {
  // Load the 3D model and textures
  heart = loadModel('heart.obj', true);
  for (let i = 1; i <= 5; i++) {
    textures.push(loadImage(`texture${i}.jpg`)); 
  }
}

function setup() {
  createCanvas(800, 800, WEBGL);

  // Set up initial positions and shape types (box, cone, etc.)
  for (let i = 0; i < 5; i++) {
    shapes.push(random(['box', 'cone', 'torus', 'cylinder', 'sphere']));
    positions.push({
      angle: random(TWO_PI),
      radius: random(150, 300),
      y: random(-100, 100),
      speed: random(0.005, 0.015)
    });
  }

}

function draw() {
  background(30);
  ambientLight(150);
  directionalLight(255, 255, 255, 0, 0, -1);

  // Center Heart
  push();
  rotateY(frameCount * 0.01);
  scale(1.5);
  normalMaterial(); // You can swap this for a texture too
  model(heart);
  pop();

  // Orbiting Textured Shapes
  for (let i = 0; i < shapes.length; i++) {
    let p = positions[i];
    let x = cos(p.angle) * p.radius;
    let z = sin(p.angle) * p.radius;

    push();
    texture(textures[i]);  // Apply texture
    translate(x, p.y, z);
    rotateY(frameCount * 0.01);
    rotateX(frameCount * 0.005);

    switch (shapes[i]) {
      case 'box': box(40); break;
      case 'cone': cone(20, 60); break;
      case 'torus': torus(25, 10); break;
      case 'cylinder': cylinder(20, 50); break;
      case 'sphere': sphere(30); break;
    }

    pop();

    // Update angle for rotation
    p.angle += p.speed;
  }

  // Name and Title
  push();
  resetMatrix();
  textFont();
  textSize(20);
  fill(255);
  textAlign(LEFT, TOP);
  text(" 'Heart of the System' by Hailey Savage", 10, 10);
  pop();
}

function mousePressed() {
  // Move two random shapes to a new y position
  let a = floor(random(5));
  let b;
  do {
    b = floor(random(5));
  } while (b === a);

  positions[a].y = random(-200, 200);
  positions[b].y = random(-200, 200);
}
