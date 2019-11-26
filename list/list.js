//function to handle post requests to this page
function postHandler(){
	//split the string at the ? that indicated get request variables
	let qString = window.location.href.split("?");
	if(qString[1]) { //if the array has more than 1 element continue processing
		let data = qString[1].split("&");
		if(data){//if there is any data in the request query continue processing
			let initials = "";
			let hit = "";
			let shot = "";

			//assign data to variables based on data in the string
			for(var i = 0; i < data.length; i++){
				if(data[i]){
					switch(data[i].split("=")[0]){
						case "initials": initials = data[i].split("=")[1];
							break;
						case "hit": hit = data[i].split("=")[1];
							break;
						case "shot": shot = data[i].split("=")[1];
							break;
						default:
					}
				}	
			}
			
			//remove %20 from the strings and replace it with a space
			let temp = hit.split("%20");
			hit = temp.join(" ");
			temp = shot.split("%20");
			shot = temp.join(" ");

			//get reference to relevant spans
			let dataToSet = document.getElementsByClassName("innerSpan");

			//if initials exist update textContent of relevant spans
			if(initials && initials.charAt(0) != " "){
				dataToSet[0].textContent = initials;
				dataToSet[2].textContent = shot;
				dataToSet[4].textContent = hit;
			}
		}
	}
}

postHandler();