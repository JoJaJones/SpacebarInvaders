let scrollBox = document.getElementById("scrollBox");

//function to resize the content based on the size of the window
function resize(event) {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	let boxWidth = Math.floor(width*.6);
	let boxHeight = Math.floor(height*.75);

	scrollBox.style.width = boxWidth + "px";
	scrollBox.style.height = boxHeight + "px";
	scrollBox.style.marginTop = Math.floor(height*.125)+"px";
	scrollBox.style.marginLeft = Math.floor(width*.2)+"px";

}

resize(0);
window.addEventListener("resize", resize);