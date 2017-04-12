var rabbits = [];
var wolves = [];
var grass = [];

function setup() {
  createCanvas(700, 700);

  // Initialize creatures
  for (var i = 0; i < 15; i++) {
    rabbits[i] = new Creature(random(width), random(height), "#eaeaea", 20, 3);
  }

  for (var i = 0; i < 5; i++) {
    wolves[i] = new Creature(random(width), random(height), "#000000", 40, 1);
  }

  for (var i = 0; i < 25; i++) {
    grass[i] = new Creature(random(width), random(height), "green", 10, 0);
  }

}

function draw() {
  background('#dee8df');
  // Start population
  for (var i = 0; i < rabbits.length; i++) {
    rabbits[i].run(rabbits);
    rabbits[i].eat(grass);
  }

  for (var i = 0; i < wolves.length; i++) {
    wolves[i].run(wolves);
    wolves[i].eat(grass);
  }

  for (var i = 0; i < grass.length; i++) {
    grass[i].run(grass);
  }
  
    //console.log('year end')

}
