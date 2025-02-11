let bgImage, sushiImage, plateImage, chopsticksImage;
let sushiX, sushiY;
let movingRight = true;
let fontTitle, fontName;

function preload() {
    bgImage = loadImage('images/sushi-background.png'); // AI-generated background
    plateImage = loadImage('images/plate.png'); // Plate
    chopsticksImage = loadImage('images/chopsticks.png'); // Chopsticks
  sushiImage = loadImage('images/sushi.png'); // Sushi roll
    fontTitle = loadFont('fonts/Good Matcha.otf'); // Custom font for title
    fontName = loadFont('fonts/Salmon Season.otf'); // Custom font for name
}

function setup() {
    createCanvas(500, 500);
    sushiX = 50;
    sushiY = height / 2;
    setInterval(moveSushi, 100); // Timer function to move sushi every 100ms
}

function draw() {
    background(bgImage); // Set AI background
    
    // Display static images
    image(plateImage, width / 2 - 100, height - 100, 200, 100); // Plate at bottom
    image(chopsticksImage, width - 150, 50, 100, 50); // Chopsticks in corner
    
    // Moving Sushi
    image(sushiImage, sushiX, sushiY, 80, 80);
    
    // Titles with Custom Fonts
    fill(255);
    textFont(fontTitle);
    textSize(32);
    text("Sushi Time!", 20, 40);
    
    textFont(fontName);
    textSize(16);
    text("Created by Hailey Savage", width - 180, height - 20);
}

function moveSushi() {
    // Move sushi left and right
    if (movingRight) {
        sushiX += 5;
        if (sushiX >= width - 100) movingRight = false;
    } else {
        sushiX -= 5;
        if (sushiX <= 50) movingRight = true;
    }
}
