function initTasks(){
	if(! localStorage["defaultTaskID"]){
		localStorage["defaultTaskID"] = 1;
	}
	
	// populate the task list
	var key;
	for(key in localStorage){
		if(key === "defaultTaskID"){
			continue;
		}

		console.log(key);
		console.log(localStorage[key]);
		var task = JSON.parse(localStorage[key]);
		var name = task["name"];
		var id = task["id"];

        var element = $("<div>");
        element.attr("class", "task");
        element.attr("id", id);
        element.text(name);
        element.fadeIn(600);
        $(".tasks").append(element);

	}


} // end of function initTasks


var defaultTasks = ["Pick up milk", "Call mom", "Rotate tires", "Cancel the apocalypse", "Invent", "Sing the blues", "Be kind to animals"];

function choice(L){
	// returns a random element from L
	var chosen;	
	var i;
	for(i = 0; i < L.length; i += 1){
		if(Math.random() < 1.0 / i){
			chosen = L[i];
		}	
	}

	return chosen;
} // end of function choice



function newTask(){
	var n = parseInt(localStorage["defaultTaskID"])
	localStorage["defaultTaskID"] = n + 1

	var task = {
		id: n,
		name: "Task " + n,
		entries: [choice(defaultTasks), choice(defaultTasks)]
	};

	localStorage[n] = JSON.stringify(task);

	return n;
} // end of function newTask

function populateForm(task){
	
}