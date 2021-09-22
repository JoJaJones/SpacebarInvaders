var controller = new GameController();

var display = new GameDisplay(document.getElementById("gameArea"));
display.resize(document.documentElement.clientHeight, document.documentElement.clientWidth, aspectRatio);

var gameCanvas = document.getElementById("gameArea");

var game = new Game();

var detectKeyPress = function(event){
	controller.detectButton(event.type, event.keyCode);
}

//create a function to call the necessary functions to update the game screen to pass to the engine
var renderScreen = function(){
	display.resize(Math.floor(document.documentElement.clientHeight*.75), document.documentElement.clientWidth, aspectRatio);
	display.renderBackground();
	display.drawPlayerChar(game.player);
	display.drawObstacles(game);
	display.drawProjectiles(game.player);
	display.render();
}

//create a function to call necessary functions to update the game state to pass to the engine
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

//create engine and start the game
var engine = new GameEngine(1000/framesPerSecond, renderScreen, updateState);
engine.render();
engine.runGame();

//function to send the messages and user entered initials to the results screen
function postToMessages(){
	event.preventDefault();

	//https://www.w3schools.com/xml/xml_http.asp
	let request = new XMLHttpRequest();
	
	request.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       window.location = request.responseURL;
    }
	};

	let url = "../list/list.html?initials="
	
	//append values to the url
	var initials = document.getElementById("initials").value;
	url+= initials + "&hit=";
	var hit = document.getElementById("stringOfHit").textContent;
	url+=hit+"&shot=";
	var shot = document.getElementById("stringOfShot").textContent;
	url+=shot;
	
	request.open("POST", url, true);
	request.send();
}

window.addEventListener("keydown", detectKeyPress);
window.addEventListener("keyup", detectKeyPress);