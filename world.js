// Population stats
var maxspeed = 3;
var calPerSec = 1;
var creatureSize = 40;
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
  color: 'gray',
	health: 100
}

wolfStats = {
	rank: 2,
	diameter: creatureSize,
	visionRadius: vision,
	maxspeed: maxspeed,
	startingDiet: 25,
	calorieBurnRate: calPerSec,
  color: 'black',
	health: 200
}

//Array of all species
var worldList = [wolfStats, rabbitStats, grassStats];

// Setup and initialize ecosystem
function setup() {
  createCanvas(700, 700);

  // Initialize creatures
  for (var i = 0; i < 5; i++) {
		position1 = createVector(random(width),random(height))
    wolves[i] = new Creature(position1, worldList[0]);
  }

  for (var i = 0; i < 15; i++) {
		position2 = createVector(random(width),random(height))
    rabbits[i] = new Creature(position2, worldList[1]);
  }

  for (var i = 0; i < 25; i++) {
		position3 = createVector(random(width),random(height))
    grass[i] = new Creature(position3, worldList[2]);
  }
}

// Draw creature species (run creature functions)
function draw() {
  background('#dee8df');
  // Start population
  for (var i = 0; i < rabbits.length; i++) {
    rabbits[i].run(rabbits);
    rabbits[i].eat(grass);
    potentialChild = rabbits[i].reproduce();
    if (potentialChild != null){
        rabbits.push(potentialChild);
    }
  }

  for (var i = 0; i < wolves.length; i++) {
    wolves[i].run(wolves);
    wolves[i].eat(rabbits);
  }

  for (var i = 0; i < grass.length; i++) {
    grass[i].run(grass);
    if (random(1) < 0.0005) {
      grass.push(new Creature(createVector(random(width),random(height)), worldList[2]));
    }
  }
    //console.log('year end')
}
