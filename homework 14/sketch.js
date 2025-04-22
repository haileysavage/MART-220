// Global variables
let player;
let obstacles = [];
let collectibles = [];
let score = 0;
let health = 100;
let bg;

// Load background image
function preload() {
  bg = loadImage('background.jpg'); 
}

// Setup player and objects
function setup() {
  createCanvas(800, 600);
  player = createVector(width / 2, height / 2);

  for (let i = 0; i < 5; i++) {
    collectibles.push(createVector(random(width), random(height)));
  }

  for (let i = 0; i < 5; i++) {
    obstacles.push({
      pos: createVector(random(width), random(height)),
      speed: p5.Vector.random2D().mult(2),
      chase: random() < 0.5
    });
  }
}

// Main game loop
function draw() {
  background(bg);

  // Player
  fill('blue');
  ellipse(player.x, player.y, 30, 30);
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;

  // Collectibles
  for (let i = collectibles.length - 1; i >= 0; i--) {
    fill('gold');
    ellipse(collectibles[i].x, collectibles[i].y, 20, 20);

    if (dist(player.x, player.y, collectibles[i].x, collectibles[i].y) < 25) {
      collectibles.splice(i, 1);
      score += 10;
    }
  }

  // Obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];

    if (obs.chase) {
      let dir = p5.Vector.sub(player, obs.pos).setMag(1.5);
      obs.pos.add(dir);
    } else {
      obs.pos.add(obs.speed);
      if (obs.pos.x < 0 || obs.pos.x > width) obs.speed.x *= -1;
      if (obs.pos.y < 0 || obs.pos.y > height) obs.speed.y *= -1;
    }

    fill('red');
    ellipse(obs.pos.x, obs.pos.y, 25, 25);

    if (dist(player.x, player.y, obs.pos.x, obs.pos.y) < 25) {
      obstacles.splice(i, 1);
      health -= 20;
    }
  }

  // UI Box
  fill(0, 0, 0, 150); // semi-transparent black
  rect(10, 10, 150, 70, 10); // x, y, width, height, border radius

  // Score and Health Text
  fill(255);
  textSize(18);
  text(`Score: ${score}`, 20, 35);
  text(`Health: ${health}`, 20, 60);

  if (health <= 0) {
    noLoop();
    textSize(50);
    fill('red');
    text('Game Over', width / 2 - 130, height / 2);
  }
}
