let sushiImages = [];
let characterFrames = [];
let character;
let sushiObjects = [];
let frameIndex = 0;
let animationSpeed = 200; // Change frame every 200ms
let lastFrameChange = 0;
let numSushi = 5; // Number of sushi pieces

function preload() {
    // Load character frames
    for (let i = 1; i <= 6; i++) {
        characterFrames.push(loadImage(`images/character${i}.png`));
    }
    
    // Load sushi images
    for (let i = 1; i <= 3; i++) {
        sushiImages.push(loadImage(`images/sushi${i}.png`));
    }
}

function setup() {
    createCanvas(800, 600);
    character = new Character(width / 2, height - 100);
    
    // Create sushi objects
    for (let i = 0; i < numSushi; i++) {
        let x = random(width);
        let y = random(height - 200);
        let img = random(sushiImages);
        sushiObjects.push(new Sushi(x, y, img));
    }
}

function draw() {
    background(220);

    // Update and display character animation
    character.display();

    // Display sushi
    for (let sushi of sushiObjects) {
        sushi.display();
    }

    // Handle animation timing
    if (millis() - lastFrameChange > animationSpeed) {
        frameIndex = (frameIndex + 1) % characterFrames.length;
        lastFrameChange = millis();
    }
}

// Character class
class Character {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    display() {
        image(characterFrames[frameIndex], this.x, this.y, 100, 100);
    }
}

// Sushi class
class Sushi {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = img;
    }

    display() {
        image(this.img, this.x, this.y, 50, 50);
    }
}
