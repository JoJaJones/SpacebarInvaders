var paragraphs = document.getElementsByTagName("p");

class GameDisplay{
	constructor(canvas){
		this.displayBuffer  = document.createElement("canvas").getContext("2d");
  	this.gameContainer = canvas;
  	this.gameScreen = canvas.getContext("2d");
  	this.xMod = 0;
  	this.yMod = 0;
	};

  renderBackground = function(color) {
    this.displayBuffer.fillStyle = BACKGROUND_COLOR;
    this.displayBuffer.fillRect(0, 0, this.displayBuffer.canvas.width, this.displayBuffer.canvas.height);
  };

  drawPlayerChar = function(playerData) {
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
  	var pos = this.calcAdjustedPosition(playerData, this.displayBuffer.canvas.height);
  	drawChar(pos, this.displayBuffer, SHIP_OUTER_COLOR);
  	pos = this.calcAdjustedPosition(playerData, this.displayBuffer.canvas.height, true);
  	drawChar(pos, this.displayBuffer, SHIP_INNER_COLOR);

  };


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

	drawProjectiles = function(playerData){
  	for(var i = 0; i < playerData.numShots; i++){
  		var shotData = this.calcAdjustedPosition(playerData.shots[i], this.displayBuffer.canvas.height);
  		this.displayBuffer.fillStyle = playerData.shots[i].color;
  		this.displayBuffer.fillRect(shotData.startX, shotData.startY, shotData.width, shotData.height);
  	}
  }
  
  render = function() { 
  	this.gameScreen.drawImage(
  		this.displayBuffer.canvas, 
  		0, 0, this.displayBuffer.canvas.width, this.displayBuffer.canvas.height, 
  		0, 0, this.gameScreen.canvas.width, this.gameScreen.canvas.height); 
  };

  resize = function(height, width, aspectRatio) {

    var heightAdjust, widthAdjust = 0;
    if(height > 50){
    	heightAdjust = 50;
    } else {
    	heightAdjust = 0;
    }
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

    this.xMod = this.displayBuffer.canvas.width/GAME_WIDTH;
    this.yMod = this.displayBuffer.canvas.height/GAME_HEIGHT;

    if(this.gameScreen.canvas.height < height - heightAdjust) {
    	heightAdjust = height - this.gameScreen.canvas.height;
    }

    if(this.gameScreen.canvas.width < width){
    	widthAdjust = width - this.gameScreen.canvas.width;
    }

    var leftPad = widthAdjust/2;
    this.gameContainer.style.paddingTop = Math.floor((heightAdjust/2)).toString() + "px";
    this.gameContainer.style.paddingLeft = Math.floor((leftPad)).toString() + "px";
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

  performResize = (event) => { this.resize(event); };

};