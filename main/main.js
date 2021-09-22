// String constants used for the slideshow
const images = ["image1.png", "image2.png", "image3.png", "image4.png"]; //image relative paths
const captions = ["", "Shoot the letters", "Letters you shoot get added to the 'Shot string', letters that hit you get added to the 'Hit string'",
								"Enter your initials and hit submit to add your strings to the list"]; //image captions

// grab references to the DOM elements needed
function getReferences(){
	let references = Object;
	references.slideshow = document.getElementById("carouselImage"); //carousel div reference
	references.buttons = document.getElementsByClassName("changeImage"); //list of buttons to navigate the image carousel
	references.font = document.getElementById("linkFont");
	references.imagePane = document.getElementById("displayedImg"); //img tag reference
	references.caption = document.getElementById("imageCaption");
	return references
}

let currImage = 0; //track current image
let interval = window.setInterval(setImage, 10000);

//set next image based on which button is click (default value of 1 for the timed changed)
function setImage(i = 1){
	let carosel = getReferences();
	window.clearInterval(interval);//reset interval

	//update current image index
	currImage += i + images.length;
	currImage %= images.length;

	//update image and caption
	carosel.imagePane.src = images[currImage];
	carosel.caption.textContent = captions[currImage];

	interval = window.setInterval(setImage, 10000); //restart animation interval
}

// function to calculate appropriate image size for the carosel and return it as an object
function calcImageSize(width, height) {
	let imgData = Object;
	imgData.width = Math.floor(width*.6);
	imgData.height = Math.floor(height*.5);

	if(imgData.width/imgData.height > 2) {
		imgData.width = imgData.height*2;
	} else {
		imgData.height = Math.floor(imgData.width/2);
	}

	return imgData;
}

//function to resize elements on window resize also used to initialize the page
function resize(event) {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	let imgData = calcImageSize(width, height);
	let carosel = getReferences();


	carosel.slideshow.style.border = "solid 5px #545351"

	for(let button of carosel.buttons){
		button.style.position = "absolute";
		button.style.top = Math.floor(imgData.height*.42) + "px";
		button.style.color = "white"
	}

	carosel.font.style.fontSize = Math.floor(imgData.height*.1)+"px";
	carosel.buttons[0].style.left = carosel.buttons[1].style.right = "2px";
	carosel.slideshow.style.position = "relative";
	carosel.slideshow.style.width = imgData.width + "px";
	carosel.slideshow.style.height = imgData.height + "px";
	carosel.slideshow.style.marginBottom = "2px";
	carosel.slideshow.style.left = Math.floor((width - imgData.width)/2) + "px";

	carosel.imagePane.width = imgData.width;
	carosel.imagePane.height = imgData.height;
}

resize(0);

window.addEventListener("resize", resize);