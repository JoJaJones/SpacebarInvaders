const HOVER_BG = "black";
const HOVER_TEXT = "white";
const DEFAULT_BG = "#545351";
const DEFAULT_TEXT = "#02d1d1";
const links = ["main/main.html", "game/game.html", "list/list.html", "about/about.html"]

let topDiv = document.getElementById("spacingDiv"); //spacer div at top of page
let linkDiv = document.getElementById("linkDiv"); //nav bar div
let contentFrame = document.getElementById("gameFrame"); //iframe for all page content
let spans = linkDiv.getElementsByTagName("span"); //list of nav bar buttons

//function to update the colors when hovered
function hovered(){
	this.style.background = HOVER_BG;
	this.style.color = HOVER_TEXT;
}

//function to return colors to default when no longer hovered
function reset(){
	this.style.background = DEFAULT_BG;
	this.style.color = DEFAULT_TEXT;
}

//function to update content when bav bar element is clicked
function clicked(){
	contentFrame.src = this.link;
}

//set click/hover/reset functions and the link variables for each span on page load
function init(){
	let j = 0;
	for(let i of spans) {
		i.addEventListener("mouseover", hovered);
		i.addEventListener("mouseout", reset);
		i.addEventListener("click", clicked);
		i.link = links[j];
		j++;
	}

	resize(0);
}

//function to resize the navbar for consistent sizing on different page sizes
function resize(event) {
	let width = document.documentElement.clientWidth;
	let height = document.documentElement.clientHeight;
	topDiv.width = linkDiv.width = contentFrame.width = width;
	topDiv.height = Math.floor(height*.02);
	linkDiv.height = Math.floor(height*.08);
	for(let i of spans) {
		let size = Math.floor(linkDiv.height/3).toString() + "px";
		i.style.paddingTop = size;
		i.style.paddingBottom = -size;
		i.style.height = 2*size + "px";
		i.style.fontSize = size;
	}

	contentFrame.height = height - topDiv.height - linkDiv.height;
	contentFrame.minHeight = contentFrame.height;
	contentFrame.width = width;
}

init();

window.addEventListener("resize", resize);