let angle = 0;
let myFont;

function preload() {
  myFont = loadFont('https://cdnjs.cloudflare.com/ajax/libs/topcoat/0.8.0/font/SourceCodePro-Regular.otf');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  textFont(myFont);
  textSize(24);
}
function draw() {
  background(240, 248, 255); // soft blue background
  lights(); 

// Title and name
push();
resetMatrix(); 
camera();       
fill(80);       
textFont(myFont);
textSize(24);
text("Double Scoop Sundae",  - width / 2, 30 - height / 2);
text("By Hailey Savage", 20 - width / 2, 60 - height / 2);
pop();


  // 🍦 Cone (waffle cone)
  push();
  translate(0, 120, 0);
  ambientMaterial(222, 184, 135); // waffle tan
  rotateX(PI); // flip cone
  rotateZ(angle);
  cone(50, 120);
  pop();

  // 🍨 Bottom scoop (mint)
  push();
  translate(0, 50, 0);
  ambientMaterial(152, 255, 152); // mint green
  rotateY(angle);
  sphere(55);
  pop();

  // 🍓 Top scoop (strawberry)
  push();
  translate(0, 0, 0);
  ambientMaterial(255, 182, 193); // strawberry pink
  rotateX(angle);
  sphere(50);
  pop();

  // 🍫 Chocolate flake
  push();
  translate(30, -10, -40);
  ambientMaterial(90, 45, 20); // dark chocolate
  rotateZ(angle * 2);
  box(10, 50, 10);
  pop();

  // 🍒 Cherry on top
  push();
  translate(0, -40, 30);
  ambientMaterial(255, 0, 0); // bright red
  rotateX(angle * 1.5);
  sphere(15);
  pop();

  // 🥄 Metallic spoon
  push();
  translate(-40, 10, -40);
  specularMaterial(200);
  shininess(50);
  rotateX(angle);
  cylinder(5, 60);
  pop();

  angle += 0.01;
}

