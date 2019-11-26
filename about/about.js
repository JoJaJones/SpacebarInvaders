var scrollBox = document.getElementById("scrollBox");

//function to resize the content based on the size of the window
function resize(event) {
	var width = document.documentElement.clientWidth;
	var height = document.documentElement.clientHeight;
	var boxWidth = Math.floor(width*.6);
	var boxHeight = Math.floor(height*.75);

	scrollBox.style.width = boxWidth + "px";
	scrollBox.style.height = boxHeight + "px";
	scrollBox.style.marginTop = Math.floor(height*.125)+"px";
	scrollBox.style.marginLeft = Math.floor(width*.2)+"px";

}

resize(0);
window.addEventListener("resize", resize);