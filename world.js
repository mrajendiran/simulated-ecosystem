// Population stats
var maxspeed = 3;
var calPerSec = 1;
var creatureSize = 40;
var reproThresh = 0.0001;
var vision = 3;
var appetite = 10;

// Hold array for each creature species
var rabbits = [];
var wolves = [];
var grass = [];

// Stats for every species
grassStats = {
	rank: 1,
	diameter: creatureSize*0.4,
    reproThresh: reproThresh * 1.5,
    hunger: 0, // maybe grass doesn't need hunger and appetite...
    appetite: appetite*0.4,
	visionRadius: vision,
	maxspeed: 0,
	startingDiet: 5,
	calorieBurnRate: calPerSec,
  color: '#00AA5B'
}

rabbitStats = {
	rank: 1,
	diameter: creatureSize*0.6,
    reproThresh: reproThresh,
    hunger: 0,
    appetite: appetite*0.6,
	visionRadius: vision,
	maxspeed: maxspeed,
	startingDiet: 5,
	calorieBurnRate: calPerSec,
  color: '#55555B',
	health: 100
}

wolfStats = {
	rank: 2,
	diameter: creatureSize,
    reproThresh: reproThresh * 0.4,
    hunger: 0,
    appetite: appetite,
	visionRadius: vision,
	maxspeed: maxspeed,
	startingDiet: 25,
	calorieBurnRate: calPerSec,
  color: '#AA555B',
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

function createRabbit(event) {
  //log location
    downX = event.pageX;
    downY = event.pageY;
    //rabbits.push(new Creature(createVector(downX,downY), worldList[1])); //just rabbits
    //
    // randomly generate
    newPick = int(random(3)); // pick a 0, 1, or 2
    console.log(newPick);
    //
    if (newPick==0) {
        wolves.push(new Creature(createVector(downX,downY), worldList[newPick]));
    } else if (newPick==1) {
        rabbits.push(new Creature(createVector(downX,downY), worldList[newPick]));
    } else if (newPick==2) {
        grass.push(new Creature(createVector(downX,downY), worldList[newPick]));
    }
    
}  
document.addEventListener("mousedown", createRabbit);

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
    potentialChild = wolves[i].reproduce();
    if (potentialChild != null){
        wolves.push(potentialChild);
    }
  }

  for (var i = 0; i < grass.length; i++) {
    grass[i].run(grass);
    potentialChild = grass[i].reproduce();
    if (potentialChild != null){
        grass.push(potentialChild);
    }
     
    if (random(1) < 0.0005) {
      grass.push(new Creature(createVector(random(width),random(height)), worldList[2]));
    }
    
  }
    //console.log('year end')
}
