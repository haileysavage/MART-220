let player;
let obstacles;
let collectibles;
let hazards;
let score = 0;
let health = 5;

function setup() {
  createCanvas(600, 400);
  
  // Groups for better management
  obstacles = new Group();
  collectibles = new Group();
  hazards = new Group();
  
  // Create player
  player = new Sprite(width / 2, height / 2, 20, 20);
  
  // Create obstacles
  for (let i = 0; i < 3; i++) {
    let obs = new Sprite(random(width), random(height), 40, 40, "static"); // "static" means immovable
    obstacles.add(obs);
  }
  
  // Create collectibles
  for (let i = 0; i < 5; i++) {
    let col = new Sprite(random(width), random(height), 15, 15);
    col.color = "green";
    collectibles.add(col);
  }
  
  // Create hazards
  for (let i = 0; i < 3; i++) {
    let haz = new Sprite(random(width), random(height), 15, 15);
    haz.color = "red";
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

  // Collect items
  player.overlaps(collectibles, function (player, col) {
    col.remove();
    score++;
    
      // Spawn a new collectible at a random location
  let newCol = new Sprite(random(width), random(height), 15, 15);
  newCol.color = "green";
  collectibles.add(newCol);
  });

  // Hazard collision
  player.overlaps(hazards, function (player, haz) {
    haz.remove();
    health--;
  });

  // Win/Lose Conditions
  textSize(16);
  fill(0);
  text('Score: ' + score, 10, 20);
  text('Health: ' + health, 10, 40);

  if (score >= 10) {
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

  // Use allSprites.draw() instead of drawSprites()
  allSprites.draw();
}

