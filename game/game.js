//class to create obstacle objects for tracking data about their position
class Obstacle{
	constructor(index){
		this.x = 0;
		this.y = GAME_HEIGHT;
		this.width = 3*SCALE_MULTIPLIER;
		this.height = Math.floor(this.width/fontAspectRatio);
		this.velocity = 0;
		this.char = "";
		//string used to generate the letters in a set, looping order
		this.lipsum = LIPSUM;
	}

	//function to get the next valid character from the string
	chooseLetter(index){
		if(index >= this.lipsum.length){
			index = 0;

		}
		while(this.lipsum.charAt(index) == ' '){
			index+=1;
			
		}
		this.char = this.lipsum.charAt(index);
		return (index + 1);
	}

	//update the position of the object
	update = function(){
		this.y += this.velocity;
	}
}

//class to handle all the game objects and logic
class Game {
	constructor(){
		this.height = GAME_HEIGHT;
		this.width = GAME_WIDTH;
		this.player = new Player();
		this.friction = .7;
		this.numLetters = 0;
		this.maxLetters = 15;
		this.letterIndex = 0;
		this.nextLetter = window.performance.now();
		this.letters = [new Obstacle()];
		this.shotString = "";
		this.hitString = "";
		this.hitStringTag = document.getElementById("stringOfHit");
		this.shotStringTag = document.getElementById("stringOfShot");

		for(let i = 1; i<this.maxLetters; i++){
			this.letters.push(new Obstacle());
		}
	}

	//check for collisions bewteen any collideable aspects of the game
	detectCollision = function(object){
		//stop the play if they reach the edge of the screen
		if(object.type == "player"){
			if(object.x<0) {
				object.x = 0; 
				object.velocity = 0;
			}
			if(object.x > this.width-4){
				object.x = this.width-4;
				object.velocity = 0;
			}

			for(var i = 0; i<this.numLetters; i++){
				this.checkCollisions(object, this.letters[i]);
			}

			for(var i = 0; i < this.player.numShots; i++){
				for(var j = 0; j<this.numLetters; j++){
					this.checkCollisions(this.player.shots[i], this.letters[j]);
				}
			}
		}

		//if projectile moves off the screen flag it for deletion
		if(object.type == "projectile"){
			if(object.y > this.height) { //hide projectiles until recycled
				object.velocity = 0;
				object.y = -100;
			}
		}

		//if the letter's fall off the screen flag them for deletion
		if(object.y < 0) { 
			object.velocity = 0;
			object.y = -100;
		}

		

	};

	//checks for collisions between objects and if occurred deleted the non-player objects
	checkCollisions = function(object, letter) {
		//if the passed objects overlap on x coordinates
		if(object.x < letter.x + letter.width && object.x > letter.x || letter.x < object.x + object.width && letter.x > object.x){

			//if the objects overlap on y coordinates
			if(object.y < letter.y + letter.height && object.y > letter.y || letter.y < object.y + object.height && letter.y > object.y){
				
				//if the object is not the player flag it for deletion
				if(object.type != "player") {
					object.y = -100;
					object.x = -100;
					object.velocity = 0;

					//add the letter to the shot string and then display it to the page
					if(!((this.shotString.length+1)%6)){
						this.shotString = this.shotString + " ";	
					}
					this.shotString = this.shotString + letter.char;
					this.shotStringTag.textContent = this.shotString;

				} else { //if the object is the player
					//add the letter to the hit string and display it to the page
					if(!((this.hitString.length+1)%6)){
						this.hitString = this.hitString + " ";	
					}
					this.hitString = this.hitString + letter.char;
					this.hitStringTag.textContent = this.hitString;
				}

				//move the letter off screen and set it's velocity to 0 (flag for deletion)
				letter.y = -100;
				letter.x = -100;
				letter.velocity = 0;
			}


		}
	}

	//function to create a letter object at a random x position
	createLetter = function(){
		let x = Math.floor(Math.random()*(GAME_WIDTH-this.letters[this.numLetters].width));

		this.letters[this.numLetters].x = x;
		this.letters[this.numLetters].y = GAME_HEIGHT;
		this.letters[this.numLetters].velocity = -VERTICAL_VELOCITY*.5;
		this.letterIndex = this.letters[this.numLetters].chooseLetter(this.letterIndex);
		this.numLetters++;
	}

	//function to update the game state
	update = function(){
		//function to delete letters
		var deleteLetters = function(letters, i, max){
			var temp = letters[i];
			for(var j = i; j<max; j++){
				letters[j] = letters[j+1];
			}
			letters[max] = temp;
		}

		//if it's time for a new letter create it and update the time for the next letter
		if(this.nextLetter < window.performance.now() && this.numLetters < this.maxLetters){
			this.createLetter();
			this.nextLetter = window.performance.now() + 100;
		}

		//check for collisions
		this.detectCollision(this.player);
		for(var i = 0; i<this.player.numShots; i++){
			this.detectCollision(this.player.shots[i]);
		}

		for(var i = 0; i<this.numLetters; i++){
			this.letters[i].update();
			this.detectCollision(this.letters[i]);
			if(this.letters[i].y == -100) {
				deleteLetters(this.letters, i, this.numLetters-1);
				this.numLetters--;
			} 

		}
		this.player.velocity *= this.friction;

		this.player.update();
	};

	movePlayerLeft = function() {
		if(this.player.x != 0) {
			this.player.moveLeft();
		}
	}; 

	movePlayerRight = function() {
		if(this.player.x != this.width-4) {
			this.player.moveRight();
		}
	}
}

//class to maintain information about the state of the player's character
class Player {
	constructor(){
		this.x = GAME_WIDTH/2 - 3;
		this.y = 5;
		this.width = 4*SCALE_MULTIPLIER;
		this.height = 8*SCALE_MULTIPLIER;
		this.velocity = 0;
		this.numShots = 0;
		this.shots = [new Projectile()];
		this.maxShots = 4;
		this.nextShot = window.performance.now();
		this.type = "player";
		for(var i = 1; i < this.maxShots; i++){
			this.shots.push(new Projectile());
		}
	}

	moveLeft = function(){
		this.velocity = -HORIZONTAL_VELOCITY;
	}

	moveRight = function(){
		this.velocity = HORIZONTAL_VELOCITY;
	}

	//if the player has shots available create a new projectile
	shoot = function(){
		if(window.performance.now() >= this.nextShot) {
			if(this.numShots < this.maxShots) {
				this.shots[this.numShots].shootProjectile(this.x);
				this.numShots++;

				this.nextShot = window.performance.now() + 100;
			}	
		}
	}

	//updates all player related information
	update = function(){
		//funtion to remove shot from active shots
		var deleteShot = function(shots, i, max){
			var temp = shots[i];
			for(var j = i; j < max; j++){
				shots[j] = shots[j+1];
			}
			shots[max] = temp;
		}

		this.x += this.velocity;

		//if shot's y position is off the board delete it and update shot count
		for(var i = 0; i<this.numShots; i++){

			this.shots[i].update();
			if(this.shots[i].y == -100) {
				deleteShot(this.shots, i, this.numShots-1);
				this.numShots--;
			}
		}
	}
}

//class to creat projectile objects and track their position
class Projectile {
	constructor(){
		this.x = 0;
		this.y = -100;
		this.height = 3*SCALE_MULTIPLIER;
		this.width = 1*SCALE_MULTIPLIER;
		this.velocity = 0;
		this.color = "";
		this.type = "projectile"
	}

	//initialize projectile on player use
	shootProjectile = function(x){
		this.color = SHOT_COLOR;

		this.x = x + 2;
		this.y = 15;
		this.velocity = VERTICAL_VELOCITY;
	}

	//update y coordinate of the projectile
	update = function(){
		this.y += this.velocity;
	}
}


