let player;
let obstacles;
let collectibles;
let hazards;
let particles = [];
let score = 0;
let health = 10;

function setup() {
  createCanvas(600, 400);

  obstacles = new Group();
  collectibles = new Group();
  hazards = new Group();
  
  player = new Sprite(width / 2, height / 2, 20, 20);

  // Create at least 3 obstacles
  for (let i = 0; i < 3; i++) {
    let obs = new Sprite(random(width), random(height), 40, 40, "static");
    obstacles.add(obs);
  }

  // Create pieces of food (good items)
  for (let i = 0; i < 5; i++) {
    let col = new Sprite(random(width), random(height), 15, 15);
    col.color = "green";
    collectibles.add(col);
  }

  // Create enemy hazards with health
  for (let i = 0; i < 5; i++) {
    let haz = new Sprite(random(width), random(height), 15, 15);
    haz.color = "red";
    haz.health = 3; // Each enemy has 3 health points
    hazards.add(haz);
  }
}

function draw() {
  background(200);

  // Player movement
  if (kb.pressing("left") || kb.pressing("a")) player.x -= 3;
  if (kb.pressing("right") || kb.pressing("d")) player.x += 3;
  if (kb.pressing("up") || kb.pressing("w")) player.y -= 3;
  if (kb.pressing("down") || kb.pressing("s")) player.y += 3;

  // Prevent player from moving through obstacles
  player.collides(obstacles);

  // Collect food
  player.overlaps(collectibles, function (player, col) {
    col.remove();
    score++;

    // Spawn a new collectible
    let newCol = new Sprite(random(width), random(height), 15, 15);
    newCol.color = "green";
    collectibles.add(newCol);
 });

  // Lose health when touching a hazard
  player.overlaps(hazards, function (player, haz) {
    health--;
  });

  // Attack enemies when pressing SPACE
  if (kb.presses("space")) {
    for (let i = 0; i < hazards.length; i++) {
      let haz = hazards[i];
      if (player.overlapping(haz)) {
        haz.health--; // Reduce enemy health

        // Create a particle explosion at the enemy's position
        for (let j = 0; j < 10; j++) {
          particles.push(new Particle(haz.x, haz.y));
        }

        // If enemy health reaches 0, remove it
        if (haz.health <= 0) {
          haz.remove();
        }
      }
    }
  }

  // Display particles and update them
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }

  // Display score and health
  textSize(16);
  fill(0);
  text('Score: ' + score, 10, 20);
  text('Health: ' + health, 10, 40);

  // Win/Lose Conditions
  if (hazards.length === 0) {
    textSize(32);
    fill(0, 255, 0);
    text('You Win!', width / 2 - 50, height / 2);
    noLoop();
  }

  if (health <= 0) {
    textSize(32);
    fill(255, 0, 0);
    text('Game Over!', width / 2 - 50, height / 2);
    noLoop();
  }

  allSprites.draw();
}

// Particle Class for explosion effect
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.alpha = 255;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 5;
  }

  finished() {
    return this.alpha < 0;
  }

  show() {
    noStroke();
    fill(255, this.alpha);
    ellipse(this.x, this.y, 5);
  }
}
