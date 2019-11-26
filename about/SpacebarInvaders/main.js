var controller = new GameController();

var display = new GameDisplay(document.getElementById("gameArea"));
display.resize(document.documentElement.clientHeight, document.documentElement.clientWidth, aspectRatio);

var gameCanvas = document.getElementById("gameArea");


var game = new Game();

var renderScreen = function(){
	display.resize(Math.floor(document.documentElement.clientHeight*.75), document.documentElement.clientWidth, aspectRatio);
	display.renderBackground();
	display.drawPlayerChar(game.player);
	display.drawObstacles(game);
	display.drawProjectiles(game.player);
	display.render();
}

var detectKeyPress = function(event){
	controller.detectButton(event.type, event.keyCode);
}

var updateState = function(){
	if(controller.left.active) {
		game.movePlayerLeft();
	}

	if(controller.right.active) {
		game.movePlayerRight();
	}

	if(controller.up.active) {
		controller.up.isActive = false;
		game.player.shoot();
	}

	game.update();
}

var engine = new GameEngine(1000/framesPerSecond, renderScreen, updateState);
engine.render();
engine.runGame();

window.addEventListener("keydown", detectKeyPress);
window.addEventListener("keyup", detectKeyPress);