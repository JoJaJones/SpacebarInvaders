class Obstacle{
	constructor(index){
		this.x = 0;
		this.y = GAME_HEIGHT;
		this.width = 3*SCALE_MULTIPLIER;
		this.height = Math.floor(this.width/fontAspectRatio);
		this.velocity = 0;
		this.char = "";
		this.lipsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce bibendum commodo libero, "+
			"vel sagittis neque dictum nec. Sed ullamcorper vestibulum pulvinar. Integer et dapibus mauris. "+
			"Mauris sodales est et est ultricies, ut pulvinar justo feugiat. Integer gravida, odio sit amet "+
			"mattis scelerisque, ex ligula cursus lorem, vel feugiat enim eros fringilla purus. Praesent "+
			"malesuada mattis libero, in viverra orci condimentum in. Sed id ornare libero. Aenean vitae nisl "+
			"pharetra, consectetur arcu sit amet, pellentesque sapien. Phasellus quam dui, sagittis in sem sit "+
			"amet, iaculis luctus ligula. Donec a quam pharetra metus rutrum efficitur. Aliquam tortor magna, "+
			"sagittis ac sapien et, accumsan posuere nunc. Quisque aliquam lectus non feugiat finibus. In "+
			"scelerisque tortor vitae posuere elementum. Vestibulum sed fringilla sem. Quisque faucibus "+
			"imperdiet rutrum. Nullam sit amet rhoncus erat."+
			"Ut tempus est vitae lorem volutpat luctus. Sed varius sem quis ligula eleifend venenatis. "+
			"In semper mi vitae placerat volutpat. Morbi consectetur, risus quis egestas dictum, nibh "+
			"risus suscipit metus, ac feugiat diam mauris non tortor. Sed quam urna, imperdiet sit amet "+
			"ultrices quis, porta vitae mi. Vestibulum et nisl et felis tincidunt gravida. Ut aliquam "+
			"magna eget mi rutrum, in ornare mauris sollicitudin. Donec ullamcorper, magna ut tincidunt "+
			"fermentum, nibh arcu porta libero, sed commodo ligula arcu ut odio. Vestibulum ut euismod "+
			"diam. Praesent eget pellentesque turpis. In hac habitasse platea dictumst. Maecenas fringilla "+
			"velit et justo fringilla, sit amet dapibus risus congue. Maecenas diam enim, facilisis id posuere "+
			"sagittis, blandit non ipsum."+
			"Nunc faucibus dictum placerat. Vestibulum eu venenatis diam. Praesent tincidunt dolor ut ipsum "+
			"dapibus blandit. Pellentesque semper a tortor sed auctor. Vestibulum placerat nisl nibh, quis "+
			"dictum felis pretium a. Pellentesque habitant morbi tristique senectus et netus et malesuada fames "+
			"ac turpis egestas. Integer lacinia, purus sed iaculis dapibus, orci velit volutpat tellus, eget cursus "+
			"libero urna commodo ipsum. Donec luctus scelerisque neque, eget ornare nibh ultricies sed. Sed rhoncus "+
			"ut odio eget porttitor. Nulla finibus quam id laoreet ornare. Vestibulum porta consectetur ullamcorper. "+
			"Curabitur finibus leo lacus, sed facilisis neque auctor ut. Nunc a justo tincidunt, commodo massa a, "+
			"rutrum odio. Quisque imperdiet tristique quam, et vulputate ligula luctus nec. Curabitur ut vestibulum "+
			"tortor. Suspendisse augue purus, ornare ut accumsan sit amet, feugiat vel libero."+
			"Morbi vehicula at orci nec vestibulum. Sed lobortis sem ligula. Morbi eros lectus, finibus a nibh "+
			"eget, tincidunt ultricies justo. Pellentesque fringilla eget erat sed semper. Lorem ipsum dolor sit "+
			"amet, consectetur adipiscing elit. Aliquam id ante sit amet arcu ultricies tincidunt. Vestibulum ante "+
			"ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce cursus orci vitae aliquet laoreet."+
			"Donec iaculis turpis at facilisis vehicula. Suspendisse potenti. Suspendisse convallis ac lectus "+
			"nec ultricies. Cras vitae neque sed erat bibendum auctor vel at nisl. In malesuada erat at odio "+
			"volutpat, ut faucibus turpis iaculis. Nullam eget imperdiet mauris. Morbi ultricies nisl justo. "+
			"Suspendisse augue turpis, convallis non posuere non, porttitor id nulla.";
			
	}

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



	update = function(){
		this.y += this.velocity;
	}
}

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

		for(var i = 1; i<this.maxLetters; i++){
			this.letters.push(new Obstacle());
		}
	}

	detectCollision = function(object){
		if(object.type == "player"){
			if(object.x<0) {
				object.x = 0; 
				object.velocity = 0;
			}
			if(object.x > this.width-4){
				object.x = this.width-4;
				object.velocity = 0;
			}
		}

		if(object.type == "projectile"){
			if(object.y > this.height) { //hide projectiles until recycled
				object.velocity = 0;
				object.y = -100;
			}
		}

		if(object.y < 0) { 
			object.velocity = 0;
			object.y = -100;
		}

		for(var i = 0; i<this.numLetters; i++){
			this.checkCollisions(this.player, this.letters[i]);
		}

		for(var i = 0; i < this.player.numShots; i++){
			for(var j = 0; j<this.numLetters; j++){
				this.checkCollisions(this.player.shots[i], this.letters[j]);
			}
		}

	};

	checkCollisions = function(object, letter) {
		if(object.x < letter.x + letter.width && object.x > letter.x || letter.x < object.x + object.width && letter.x > object.x){
			if(object.y < letter.y + letter.height && object.y > letter.y || letter.y < object.y + object.height && letter.y > object.y){
				if(object.type != "player") {
					object.y = -100;
					object.x = -100;
					object.velocity = 0;
					if(!((this.shotString.length+1)%6)){
						this.shotString = this.shotString + " ";	
					}
					this.shotString = this.shotString + letter.char;
					this.shotStringTag.textContent = this.shotString;

				} else {
					if(!((this.hitString.length+1)%6)){
						this.hitString = this.hitString + " ";	
					}
					this.hitString = this.hitString + letter.char;
					this.hitStringTag.textContent = this.hitString;
				}

				letter.y = -100;
				letter.x = -100;
				letter.velocity = 0;
			}


		}
	}

	createLetter = function(){
		var x = Math.floor(Math.random()*(GAME_WIDTH-this.letters[this.numLetters].width));

		this.letters[this.numLetters].x = x;
		this.letters[this.numLetters].y = GAME_HEIGHT;
		this.letters[this.numLetters].velocity = -VERTICAL_VELOCITY*.5;
		this.letterIndex = this.letters[this.numLetters].chooseLetter(this.letterIndex);
		this.numLetters++;
	}

	update = function(){
		var deleteLetters = function(letters, i, max){
			var temp = letters[i];
			for(var j = i; j<max; j++){
				letters[j] = letters[j+1];
			}
			letters[max] = temp;
		}

		if(this.nextLetter < window.performance.now() && this.numLetters < this.maxLetters){
			this.createLetter();
			this.nextLetter = window.performance.now() + 100;
		}
		this.detectCollision(this.player);
		for(var i = 0; i<this.player.numShots; i++){
			this.detectCollision(this.player.shots[i]);
		}

		for(var i = 0; i<this.numLetters; i++){
			this.detectCollision(this.letters[i]);
			this.letters[i].update();
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

	shoot = function(){
		if(window.performance.now() >= this.nextShot) {
			if(this.numShots < this.maxShots) {
				this.shots[this.numShots].shootProjectile(this.x);
				this.numShots++;

				this.nextShot = window.performance.now() + 100;
			}	
		}
	}

	update = function(){
		var deleteShot = function(shots, i, max){
			var temp = shots[i];
			for(var j = i; j < max; j++){
				shots[j] = shots[j+1];
			}
			shots[max] = temp;
		}
		this.x += this.velocity;
		for(var i = 0; i<this.numShots; i++){

			this.shots[i].update();
			if(this.shots[i].y == -100) {
				deleteShot(this.shots, i, this.numShots-1);
				this.numShots--;
			}
		}
	}
}

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

	shootProjectile = function(x){
		var index = Math.floor(Math.random()*6);

		// switch(index){
		// 	case 0: this.color = "red";
		// 				  break;
		// 	case 1: this.color = "purple";
		// 				  break;			
		// 	case 2: this.color = "blue";
		// 				  break;			
		// 	case 3: this.color = "orange";
		// 				  break;			
		// 	case 4: this.color = "green";
		// 				  break;			
		// 	case 5: this.color = "yellow";
		// }

		this.color = SHOT_COLOR;

		this.x = x + 2;
		this.y = 15;
		this.velocity = VERTICAL_VELOCITY;
	}

	update = function(){
		this.y += this.velocity;
	}
}


