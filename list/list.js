//function to handle post requests to this page
function postHandler(){
	//split the string at the ? that indicated get request variables
	let qString = window.location.href.split("?");

	if(qString[1]) { //if the array has more than 1 element continue processing
		let data = qString[1].split("&");
		if(data){//if there is any data in the request query continue processing
			// initialize dictionary with relevant keys
			let processedData = {"initials":"", "hit":"", "shot":""};

			// for argument in URL string load the key and value into the dictionary
			for(let arg of data){
				let key, value;
				[key, value] = arg.split("=");

				processedData[key] = value.split("%20").join(" ");
			}

			//get reference to relevant spans
			let dataToSet = document.getElementsByClassName("innerSpan");

			//if initials exist update textContent of relevant spans
			if(processedData["initials"] && processedData["initials"].charAt(0) != " "){
				dataToSet[0].textContent = processedData["initials"];
				dataToSet[2].textContent = processedData["shot"];
				dataToSet[4].textContent = processedData["hit"];
			}
		}
	}
}

postHandler();