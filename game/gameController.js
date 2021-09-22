class GameController{
	constructor(){
		this.up = new ButtonController();
		this.left = new ButtonController();
		this.right = new ButtonController();
	}
	
	//check if a button is being pressed, if so set it to active
	detectButton(type, keyCode){
		let isDown = (type == "keydown");
		switch(keyCode){
			//case for left arrow
			case 37: this.left.toggleActive(isDown);
							 break;
			//cases for spacebar and up arrow
			case 32:
			case 38: this.up.toggleActive(isDown);
							 break;
			//case for right arrow
			case 39: this.right.toggleActive(isDown);
		}
		
	}

}

//class to handle button state
class ButtonController {
	constructor(){
		this.active = false;
	}

	toggleActive(isDown){
		this.active = isDown;
	}
}

