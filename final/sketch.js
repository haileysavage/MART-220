// Global variables
let player;
let obstacles = [];
let collectibles = [];
let healthPickups = [];
let score = 0;
let health = 100;
let bg;
let level = 1;
let flashTimer = 0;
let gameOver = false;
let gameWon = false;

// Load background images for each level
let levelBackgrounds = [];

function preload() {
  for (let i = 1; i <= 5; i++) {
    levelBackgrounds[i] = loadImage(`background${i}.jpg`);
  }
}

// Setup player and level
function setup() {
  createCanvas(800, 600);
  player = createVector(width / 2, height / 2);
  startLevel(level);
}

// Start a specific level
function startLevel(lvl) {
  obstacles = [];
  collectibles = [];
  healthPickups = [];
  health = min(health + 20, 100); // small health bonus per level
  player = createVector(width / 2, height / 2);

  let levelSettings = [
    null, // dummy for index 0
    { collectibles: 5, obstacles: 4, healthPacks: 1, speedBoost: 0 },
    { collectibles: 6, obstacles: 6, healthPacks: 1, speedBoost: 0.2 },
    { collectibles: 8, obstacles: 8, healthPacks: 2, speedBoost: 0.4 },
    { collectibles: 10, obstacles: 10, healthPacks: 2, speedBoost: 0.6 },
    { collectibles: 12, obstacles: 12, healthPacks: 3, speedBoost: 0.8 }
  ];

  let settings = levelSettings[lvl];

  spawnCollectibles(settings.collectibles);
  spawnObstacles(settings.obstacles, settings.speedBoost);
  spawnHealthPickups(settings.healthPacks);
}

// Main game loop
function draw() {
  if (gameOver) {
    showGameOver();
    return;
  }

  if (gameWon) {
    showGameWon();
    return;
  }

  background(levelBackgrounds[level]);

  if (flashTimer > 0) {
    background(255, 0, 0, 100);
    flashTimer--;
  }

  // Player movement
  fill('blue');
  ellipse(player.x, player.y, 30, 30);
  if (keyIsDown(LEFT_ARROW)) player.x -= 5;
  if (keyIsDown(RIGHT_ARROW)) player.x += 5;
  if (keyIsDown(UP_ARROW)) player.y -= 5;
  if (keyIsDown(DOWN_ARROW)) player.y += 5;
  player.x = constrain(player.x, 0, width);
  player.y = constrain(player.y, 0, height);

  // Collectibles
  for (let i = collectibles.length - 1; i >= 0; i--) {
    fill('gold');
    ellipse(collectibles[i].x, collectibles[i].y, 20, 20);
    if (dist(player.x, player.y, collectibles[i].x, collectibles[i].y) < 25) {
      collectibles.splice(i, 1);
      score += 10;
    }
  }

  // Health pickups
  for (let i = healthPickups.length - 1; i >= 0; i--) {
    fill('lime');
    rect(healthPickups[i].x, healthPickups[i].y, 20, 20);
    if (dist(player.x, player.y, healthPickups[i].x, healthPickups[i].y) < 25) {
      healthPickups.splice(i, 1);
      health = min(health + 20, 100);
    }
  }

  // Obstacles
  for (let i = obstacles.length - 1; i >= 0; i--) {
    let obs = obstacles[i];
    if (obs.chase) {
      let dir = p5.Vector.sub(player, obs.pos).setMag(1.5 + obs.speedBoost);
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
      flashTimer = 10;
    }
  }

  // UI
  fill(0, 0, 0, 150);
  rect(10, 10, 200, 90, 10);
  fill(255);
  textSize(18);
  text(`Score: ${score}`, 20, 35);
  text(`Health: ${health}`, 20, 60);
  text(`Level: ${level}`, 20, 85);

  if (health <= 0) {
    gameOver = true;
  }
  
  // Draw health bar background
fill(255);
rect(20, 100, 140, 20, 5);

// Draw green health bar (based on current health)
fill(0, 255, 0);
let healthWidth = map(health, 0, 100, 0, 140);
rect(20, 100, healthWidth, 20, 5);

// Add 'Health' Bar
fill(0);
textSize(14);
textAlign(LEFT, CENTER);
text('Health', 20, 90);

  // Check if level complete
  if (collectibles.length === 0 && health > 0 && !gameOver && !gameWon) {
    if (level < 5) {
      level++;
      startLevel(level);
    } else {
      gameWon = true;
    }
  }
}

function showGameOver() {
  background(0);
  fill('red');
  textSize(50);
  textAlign(CENTER, CENTER);
  text('Game Over', width / 2, height / 2);
}

function showGameWon() {
  background(0, 100, 0);
  fill('white');
  textSize(45);
  textAlign(CENTER, CENTER);
  text('You Win!', width / 2, height / 2 - 30);
  textSize(24);
  text(`Final Score: ${score}`, width / 2, height / 2 + 20);
}

// Spawning functions
function spawnCollectibles(n) {
  for (let i = 0; i < n; i++) {
    collectibles.push(createVector(random(width), random(height)));
  }
}

function spawnObstacles(n, speedBoost) {
  for (let i = 0; i < n; i++) {
    obstacles.push({
      pos: createVector(random(width), random(height)),
      speed: p5.Vector.random2D().mult(2 + speedBoost),
      speedBoost: speedBoost,
      chase: random() < 0.5
    });
  }
}

function spawnHealthPickups(n) {
  for (let i = 0; i < n; i++) {
    healthPickups.push(createVector(random(width), random(height)));
  }
}



