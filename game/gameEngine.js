class GameEngine{
	constructor(frameLength, render, update){
		this.update = update; //function to update the state of the buffer canvas
		this.render = render; //function to draw the buffer canvas to the canvas on the page
		this.drawNewScreen = false;

		this.frameLength = frameLength;
		this.timeToRefresh = frameLength;

		this.time = undefined;
		this.currentAnimation = undefined;
	}
	
	continueRunning = (time_step) => { 
		this.run(time_step); 
	};

	//start runing the game
	runGame = function(){
		this.time = window.performance.now();
		this.timeToRefresh = 0;

		//update screen and call function to recursively run the game
		this.currentAnimation = window.requestAnimationFrame(this.continueRunning);
	}

	//function to end the game;
	endGame = function(){
		window.cancelAnimationFrame(this.currentAnimation);
	}

	//function for the main loop the engine runs for the course of the game
	run = function(currentTime) {
		this.timeToRefresh = this.timeToRefresh - (currentTime - this.time);
		this.time = currentTime;
		
		//if the correct amount of time has elapsed 
		if(this.timeToRefresh <= 0) {
			this.drawNewScreen = true;
		}

		//if time to draw new screen, draw it and update game state
		if(this.drawNewScreen){
			this.update();
			this.render();
			
			this.drawNewScreen = false;
			this.timeToRefresh = this.frameLength;
		}

		//recursive animation loop
		this.currentAnimation = window.requestAnimationFrame(this.continueRunning);
	}
};