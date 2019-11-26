let slideshow = document.getElementById("carouselImage"); //carousel div reference
let buttons = document.getElementsByClassName("changeImage"); //list of buttons to navigate the image carousel
let font = document.getElementById("linkFont"); 
let imagePane = document.getElementById("displayedImg"); //img tag reference
let images = ["image1.png", "image2.png", "image3.png", "image4.png"]; //image relative paths
let captions = ["", "Shoot the letters", "Letters you shoot get added to the 'Shot string', letters that hit you get added to the 'Hit string'", 
								"Enter your initials and hit submit to add your strings to the list"]; //image captions
var currImage = 0; //track current image
var interval = window.setInterval(setImage, 10000);

//set next image based on which button is click (default value of 1 for the timed changed)
function setImage(i = 1){
	let caption = document.getElementById("imageCaption");
	window.clearInterval(interval);//reset interval

	//update current image index
	currImage+=i + images.length;
	currImage%= images.length;

	//update image and caption
	imagePane.src = images[currImage];
	caption.textContent = captions[currImage];

	interval = window.setInterval(setImage, 10000); //restart animation interval
}

//function to resize elements on window resize also used to initialize the page
function resize(event) {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	var imgWidth = Math.floor(width*.6);
	var imgHeight = Math.floor(height*.5);

	slideshow.style.border = "solid 5px #545351"
	if(imgWidth/imgHeight > 2) {
		imgWidth = imgHeight*2;
	} else {
		imgHeight = Math.floor(imgWidth/2);
	}

	for(var i of buttons){
		i.style.position = "absolute";
		i.style.top = Math.floor(imgHeight*.42) + "px";
	}

	font.style.fontSize = Math.floor(imgHeight*.1)+"px";
	buttons[0].style.left = "2px";
	buttons[0].style.color = "white";
	buttons[1].style.right = "2px";
	buttons[1].style.color = "white";
	slideshow.style.position = "relative";
	slideshow.style.width = imgWidth + "px";
	slideshow.style.height = imgHeight + "px";
	slideshow.style.marginBottom = "2px";
	slideshow.style.left = Math.floor((width - imgWidth)/2) + "px";

	imagePane.width = imgWidth;
	imagePane.height = imgHeight;
}

resize(0);

window.addEventListener("resize", resize);