// Hold array for each creature species
var rabbits = [];
var wolves = [];
var grass = [];


// Setup and initialize ecosystem
function setup() {
  createCanvas(700, 700);

  // Initialize creatures
  for (var i = 0; i < 5; i++) {
		var dna = new DNA(rank=2);
    wolves[i] = new Creature(dna);
  }

  for (var i = 0; i < 15; i++) {
		var dna = new DNA(rank=1);
    rabbits[i] = new Creature(dna);
  }

  for (var i = 0; i < 100; i++) {
		var dna = new DNA(rank=0);
    grass[i] = new Creature(dna);
  }
}

// Draw creature species (run creature functions)
function draw() {
  background('#dee8df');
  // Start population

  for (var i = 0; i < wolves.length; i++) {
    wolves[i].run(wolves);
    wolves[i].eat(rabbits);
  }

  for (var i = 0; i < rabbits.length; i++) {
    rabbits[i].run(rabbits);
    rabbits[i].eat(grass);
    if (random(1) < 0.0005) {
			var dna = new DNA(rank=1);
      rabbits.push(new Creature(dna));
    }
  }

  for (var i = 0; i < grass.length; i++) {
    grass[i].run(grass);
    if (random(1) < 0.0001) {
			var dna = new DNA(rank=0);
      grass.push(new Creature(dna));
    }
  }
    //console.log('year end')
}
