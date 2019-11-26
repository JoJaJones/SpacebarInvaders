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

	runGame = function(){
		this.time = window.performance.now();
		this.timeToRefresh = 0;
		this.currentAnimation = window.requestAnimationFrame(this.continueRunning);
	}

	endGame = function(){
		window.cancelAnimationFrame(this.currentAnimation);
	}

	run = function(currentTime) {
		this.timeToRefresh = this.timeToRefresh - (currentTime - this.time);
		this.time = currentTime;
		if(this.timeToRefresh <= 0) {
			this.drawNewScreen = true;
		}

		if(this.drawNewScreen){
			this.render();
			this.update();
			this.drawNewScreen = false;
			this.timeToRefresh = this.frameLength;
		}
		this.endGame();
		this.currentAnimation = window.requestAnimationFrame(this.continueRunning);
	}

	
}