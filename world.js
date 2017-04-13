// Population stats
var maxspeed = 3;
var calPerSec = 1;
var creatureSize = 80;
var vision = 3;

// Hold array for each creature species
var rabbits = [];
var wolves = [];
var grass = [];

// Stats for every species
grassStats = {
	rank: 1,
	diameter: creatureSize*0.4,
	visionRadius: vision,
	maxspeed: 0,
	startingDiet: 5,
	calorieBurnRate: calPerSec,
  color: 'green'
}

rabbitStats = {
	rank: 1,
	diameter: creatureSize*0.6,
	visionRadius: vision,
	maxspeed: maxspeed,
	startingDiet: 5,
	calorieBurnRate: calPerSec,
  color: 'magenta'
}

wolfStats = {
	rank: 2,
	diameter: creatureSize,
	visionRadius: vision,
	maxspeed: maxspeed,
	startingDiet: 25,
	calorieBurnRate: calPerSec,
  color: 'black'
}

//Array of all species
var worldList = [wolfStats, rabbitStats, grassStats];

// Setup and initialize ecosystem
function setup() {
  createCanvas(700, 700);

  // Initialize creatures
  for (var i = 0; i < 5; i++) {
    wolves[i] = new Creature(worldList[0]);
  }

  for (var i = 0; i < 15; i++) {
    rabbits[i] = new Creature(worldList[1]);
  }

  for (var i = 0; i < 25; i++) {
    grass[i] = new Creature(worldList[2]);
  }
}

// Draw creature species (run creature functions)
function draw() {
  background('#dee8df');
  // Start population
  for (var i = 0; i < rabbits.length; i++) {
    rabbits[i].run(rabbits);
    rabbits[i].eat(grass);
  }

  for (var i = 0; i < wolves.length; i++) {
    wolves[i].run(wolves);
    wolves[i].eat(rabbits);
  }

  for (var i = 0; i < grass.length; i++) {
    grass[i].run(grass);
    if (random(1) < 0.0005) {
      grass.push(new Creature(worldList[2]));
    }
  }
    //console.log('year end')
}
