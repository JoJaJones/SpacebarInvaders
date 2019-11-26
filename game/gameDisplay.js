var paragraphs = document.getElementsByTagName("p");

class GameDisplay{
	constructor(canvas){
		this.displayBuffer  = document.createElement("canvas").getContext("2d");
  	this.gameContainer = canvas;
  	this.gameScreen = canvas.getContext("2d");
  	this.xMod = 0;
  	this.yMod = 0;
	};

  //fill the background with the bg color
  renderBackground = function(color) {
    this.displayBuffer.fillStyle = BACKGROUND_COLOR;
    this.displayBuffer.fillRect(0, 0, this.displayBuffer.canvas.width, this.displayBuffer.canvas.height);
  };

  //draw the players ship at the player's current position
  drawPlayerChar = function(playerData) {
    //draw the character's shape
  	var drawChar = function(posData, canvas, color) {
  		var endX = pos.startX + pos.width;
  		var midX = Math.floor((pos.startX + endX)/2);
  		var apex = pos.startY-pos.height;
  		canvas.fillStyle = color;
  		canvas.beginPath();
  		canvas.moveTo(pos.startX, pos.startY);
  		canvas.lineTo(midX, apex);
  		canvas.lineTo(endX, pos.startY);
  		canvas.lineTo(midX, pos.startY-2);
  		canvas.lineTo(pos.startX, pos.startY);
  		canvas.fill();
  	};

    //draw outline
  	var pos = this.calcAdjustedPosition(playerData, this.displayBuffer.canvas.height);
  	drawChar(pos, this.displayBuffer, SHIP_OUTER_COLOR);

    //draw inner shape
  	pos = this.calcAdjustedPosition(playerData, this.displayBuffer.canvas.height, true);
  	drawChar(pos, this.displayBuffer, SHIP_INNER_COLOR);

  };

  //calculate the position based on the current scale factor of the screen and return a position object with the data
  calcAdjustedPosition(locationData, canvasHeight, isInnerChar = false) {
  	var position = new Object();
  	var shift = 0;
  	if(isInnerChar){
  		shift = 1;
  	}
  	position.startX = Math.floor((locationData.x+shift)*this.xMod);
  	position.startY = Math.floor(canvasHeight-(locationData.y+shift)*this.yMod);
  	position.width = Math.floor((locationData.width-(2*shift))*this.xMod);
  	position.height = Math.floor((locationData.height-(3*shift))*this.yMod);

  	return position;
  }

  //draw the letters to the screen
  drawObstacles = function(gameData) {
  	var drawObstacle = function(obstacleData, canvas, obstacleChar) {
  		canvas.font = obstacleData.height + "px courier"
  		canvas.fillStyle = LETTER_COLOR;
  		canvas.fillText(obstacleChar, obstacleData.startX, obstacleData.startY);
  	}

  	for(var i = 0; i < gameData.numLetters; i++){
  			var obstaclePos = this.calcAdjustedPosition(gameData.letters[i], this.displayBuffer.canvas.height);
  			drawObstacle(obstaclePos, this.displayBuffer, gameData.letters[i].char);
  	}
  }

  //draw the projectiles to the screen
	drawProjectiles = function(playerData){
  	for(var i = 0; i < playerData.numShots; i++){
  		var shotData = this.calcAdjustedPosition(playerData.shots[i], this.displayBuffer.canvas.height);
  		this.displayBuffer.fillStyle = playerData.shots[i].color;
  		this.displayBuffer.fillRect(shotData.startX, shotData.startY, shotData.width, shotData.height);
  	}
  }
  
  //draw the content of the buffer canvas to the game screen
  render = function() { 
  	this.gameScreen.drawImage(
  		this.displayBuffer.canvas, 
  		0, 0, this.displayBuffer.canvas.width, this.displayBuffer.canvas.height, 
  		0, 0, this.gameScreen.canvas.width, this.gameScreen.canvas.height); 
  };

  //function to handle resizing the game area to maintain aspect ratio
  resize = function(height, width, aspectRatio) {
    //variables to handle blank space between game and edges of window
    var heightAdjust, widthAdjust = 0;
    //set initial height adjust for next calculations
    if(height > 50){
    	heightAdjust = 50;
    } else {
    	heightAdjust = 0;
    }

    //calculate and adjust gameScreen and displayBuffer height/width to match aspect ratio based on window size
    if(width/(height-heightAdjust) < aspectRatio) {
    	this.displayBuffer.canvas.height =
			this.gameScreen.canvas.height = width/aspectRatio;
			this.displayBuffer.canvas.width =
    	this.gameScreen.canvas.width = width
    } else {
    	this.displayBuffer.canvas.height =
			this.gameScreen.canvas.height = height-heightAdjust
			this.displayBuffer.canvas.width =
    	this.gameScreen.canvas.width = (height-heightAdjust)*aspectRatio;
    }


    this.gameDiv = document.getElementById("gameDiv");
    this.gameDiv.height = this.gameScreen.canvas.height;

    //set scale factor variables for position calculations
    this.xMod = this.displayBuffer.canvas.width/GAME_WIDTH;
    this.yMod = this.displayBuffer.canvas.height/GAME_HEIGHT;

    //adjust heightAjust when it's not large enough
    if(this.gameScreen.canvas.height < height - heightAdjust) {
    	heightAdjust = height - this.gameScreen.canvas.height;
    }

    //adjust width adjust when it's not large enough
    if(this.gameScreen.canvas.width < width){
    	widthAdjust = width - this.gameScreen.canvas.width;
    }

    //add top and left padding to center the game screen
    var leftPad = widthAdjust/2;
    this.gameContainer.style.paddingTop = Math.floor((heightAdjust/2)).toString() + "px";
    this.gameContainer.style.paddingLeft = Math.floor((leftPad)).toString() + "px";
    
    //add padding to the text elements for the game related strings
    for(var i of paragraphs) {
      if(leftPad > 0) {
        i.style.marginLeft = this.gameContainer.style.paddingLeft;
        i.style.marginRight = this.gameContainer.style.paddingLeft;
      } else {
        i.style.marginLeft = "8px";
        i.style.marginRight = "8px";
      }
    }
  };

  //arrow function to preseve context
  performResize = (event) => { this.resize(event); };

};