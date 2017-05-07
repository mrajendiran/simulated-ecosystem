/*
world.js
contains:
- initial species properties
- species DNA
- setup/draw p5 functions
- window functions (click to create, reload, text to screen)
*/

//population Stats: initialize species properties
var maxspeed = 3;
var calPerSec = 1;
var creatureSize = 40;
var reproThresh = 0.0001;
var vision = 3;
var appetite = 10;

// creature array
var rabbits = [];
var wolves = [];
var grass = [];

/* species stats
finetune species initialization properties
*/
grassStats = { rank: 1, diameter: creatureSize*0.4, reproThresh: reproThresh*0.5,
	hunger: 0, appetite: appetite*0.4, visionRadius: vision, maxspeed: 0, startingDiet: 5,
	calorieBurnRate: calPerSec, color: '#00AA5B', health: 100 };

rabbitStats = { rank: 2, diameter: creatureSize*0.6, reproThresh: reproThresh,
	hunger: 0, appetite: appetite*0.6, visionRadius: vision, maxspeed: maxspeed,
	startingDiet: 5, calorieBurnRate: calPerSec, color: '#55555B', health: 100 };

wolfStats = { rank: 3, diameter: creatureSize, reproThresh: reproThresh*0.2,
	hunger: 0, appetite: appetite, visionRadius: vision, maxspeed: maxspeed,
	startingDiet: 25, calorieBurnRate: calPerSec, color: '#AA555B', health: 200 };

// dna creation
grassDNA = [grassStats['rank'], grassStats['diameter'], grassStats['reproThresh'], grassStats['hunger'],
grassStats['appetite'], grassStats['visionRadius'], grassStats['maxspeed'], grassStats['startingDiet'],
grassStats['calorieBurnRate'], grassStats['color'], grassStats['health']];

rabbitDNA = [rabbitStats['rank'], rabbitStats['diameter'], rabbitStats['reproThresh'], rabbitStats['hunger'],
rabbitStats['appetite'], rabbitStats['visionRadius'], rabbitStats['maxspeed'], rabbitStats['startingDiet'],
rabbitStats['calorieBurnRate'], rabbitStats['color'], rabbitStats['health']];

wolfDNA = [wolfStats['rank'], wolfStats['diameter'], wolfStats['reproThresh'], wolfStats['hunger'],
wolfStats['appetite'], wolfStats['visionRadius'], wolfStats['maxspeed'], wolfStats['startingDiet'],
wolfStats['calorieBurnRate'], wolfStats['color'], wolfStats['health']];

// world dna of all species
var worldDNA = [wolfDNA, rabbitDNA, grassDNA];


function createWithClick(event) {
    //log location
    downX = event.pageX;
    downY = event.pageY;
    // check which kind of creature to create
    document.onkeydown = function(thisKey) {
        if (thisKey.key == 'w') {
            newPick = 0;
        } else if (thisKey.key == 'r') {
            newPick = 1;
        } else if (thisKey.key == 'g') {
            newPick = 2;
        } 
    }
    
    // make the creature
    function pickCritterToMake(creatures, method='duplicate') {
        // from scratch
        if (method == 'new') {
            var newCritter = new Creature(createVector(downX,downY), worldDNA[newPick]);
        }
        // or duplicate a random existing creature
        if (method == 'duplicate') {
            // pick a random index
            var critInd = int(random(creatures["length"]));
            // make that pick reproduce
            var partner = int(random(creatures["length"]));
            var newCritter = creatures[critInd].reproduce(creatures[partner]);
            while (newCritter == null){
                newCritter = creatures[critInd].reproduce(creatures[partner]);
            }
        } else {
            console.log('choose "duplicate" or "new" for method');
            return null;
        }
        // set position 
        newCritter.position = createVector(downX,downY);

        // add new critter to world
        creatures.push(newCritter);
        
    }
    
    // push the creature to the correct array
    if (newPick==0) {
        pickCritterToMake(wolves);
    } else if (newPick==1) {
        pickCritterToMake(rabbits);
    } else if (newPick==2) {
        pickCritterToMake(grass);
    }

    
}  
document.addEventListener("mousedown", createWithClick);

// when prey/predator population dies, restart world
function newWorld() {
	if (rabbits.length == 0 || wolves.length == 0) {
		location.reload();
	}
}

// setup and initialize ecosystem
function setup() {
  worldCanvas = createCanvas(windowWidth, windowHeight);
	var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  worldCanvas.position(x, y);

  // initialize creatures
  for (var i = 0; i < 5; i++) {
		position1 = createVector(random(width),random(height))
    wolves[i] = new Creature(position1, worldDNA[0]);
  }

  for (var i = 0; i < 15; i++) {
		position2 = createVector(random(width),random(height))
    rabbits[i] = new Creature(position2, worldDNA[1]);
  }

  for (var i = 0; i < 25; i++) {
		position3 = createVector(random(width),random(height))
    grass[i] = new Creature(position3, worldDNA[2]);
  }
}

// draw creature species (run creature functions)
function draw() {

	background('#ffffff');

	// Start population
  for (var i = 0; i < rabbits.length; i++) {

    rabbits[i].run(rabbits);   // move
    rabbits[i].eat(grass);   // eat
    rabbits[i].flee(wolves, 50, 2.5);   // run away from wolves
    // reproduce with random member of mating pool
		var partner = floor(random(0, rabbits.length-1))
    potentialChild = rabbits[i].reproduce(rabbits[partner]);
    if (potentialChild != null){
        rabbits.push(potentialChild);
    }
    // death after health causes size to decrease
    if (rabbits[i].creatureSize < 0) {
        rabbits.splice(i,1)
    }
  }

  for (var i = 0; i < wolves.length; i++) {
    wolves[i].run(wolves);
    wolves[i].eat(rabbits);
    wolves[i].flock(rabbits, 2.0);   // chase rabbits
		var partner = floor(random(0, wolves.length-1));
    potentialChild = wolves[i].reproduce(wolves[partner]);
    if (potentialChild != null){
        wolves.push(potentialChild);
    }
    if (wolves[i].creatureSize < 0) {
        wolves.splice(i,1)
    }
  }

  for (var i = 0; i < grass.length; i++) {
    grass[i].render(grass);
		var partner = floor(random(0, grass.length-1));
    potentialChild = grass[i].reproduce(grass[partner]);
    if (potentialChild != null){
        grass.push(potentialChild);
    }
  }

	// reload HTML page when population of prey/predator becomes 0
	newWorld();

	// stats in text form to canvas
	fill(0);
	textSize(18);
	var wolfPop = wolves.length;
	var rabbitPop = rabbits.length;
	var grassPop = grass.length;
	//display to HTML page
	text("Wolf Population: " + wolfPop + "\nRabbit Population: " + rabbitPop + "\nGrass Population: " + grassPop, 20, 40)

}

// change canvas size on window resize
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
