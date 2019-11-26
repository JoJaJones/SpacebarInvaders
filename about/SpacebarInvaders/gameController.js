class GameController{
	constructor(){
		this.up = new ButtonController();
		this.left = new ButtonController();
		this.right = new ButtonController();
	}
	
	detectButton(type, keyCode){
		var isDown = (type == "keydown");
		switch(keyCode){
			case 37: this.left.toggleActive(isDown);
							 break;
			case 32:
			case 38: this.up.toggleActive(isDown);
							 break;
			case 39: this.right.toggleActive(isDown);
		}
		
	}

}

class ButtonController {
	constructor(){
		this.active = false;
	}

	toggleActive(isDown){
		this.active = isDown;
	}
}

