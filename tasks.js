function initTasks(){
	if(! localStorage["defaultTaskID"]){
		localStorage["defaultTaskID"] = 1;
	}
	
	$("form").hide();
	$(".tasks").empty();

	// populate the task list
	var foundSomething = false;
	var key;
	for(key in localStorage){
		if(key === "defaultTaskID"){
			continue;
		}
		

		var task = JSON.parse(localStorage[key]);
		var name = task["name"];
		var id = parseInt(task["id"]);

		foundSomething = id;

        var element = $("<div>");
        element.attr("class", "task");
        element.attr("id", id);
        element.text(name);
        element.fadeIn(600);
        $(".tasks").append(element);

	}

	if(foundSomething){
		populateForm(foundSomething);
		$("form").show(300);
		enableTimerButton();
	} else{
		disableTimerButton();
	}


} // end of function initTasks


var defaultTasks = ["Read", "Pick up milk", "Call mom", "Rotate tires", "Cancel the apocalypse", "Invent", "Sing the blues", "Be kind to animals"];

function choice(L){
	// returns a random element from L
	var chosen;	
	var i;
	for(i = 0; i < L.length; i += 1){
		if(Math.random() < 1.0 / (i+1)) {
			chosen = L[i];
		}	
	}

	return chosen;
} // end of function choice

function chooseTwo(L){
	var first = choice(L)
	var second = choice(L)
	while(second === first){
		second = choice(L);
	}

	return [first, second];
}



function newTask(){
	var n = parseInt(localStorage["defaultTaskID"])
	localStorage["defaultTaskID"] = n + 1

	var task = {
		id: n,
		name: "Task " + n,
		entries: chooseTwo(defaultTasks)
	};

	localStorage[n] = JSON.stringify(task);

	populateForm(n);
	enableTimerButton();
	return n;
} // end of function newTask


function populateForm(id){
	saveFormContents();
	clearForm();


	id = parseInt(id);
	var task = JSON.parse(localStorage[id]);



	$("form").attr("id", task["id"]);
	$("legend").html(task["name"]);

	var entry;
	for(entry in task["entries"]){
		addEntry(task["entries"][entry]);
	}

	$("form").show(300);
} // end of function populateForm


function getFormEntries(){
	var entries = new Array();

	var a = $(".entry").map(function(){return $(this).val()});
	var i = 0;
	for(i = 0; i < a.length; i += 1){
		entries[i] = a[i];
	}

	return entries;
}


function saveFormContents(){
	var i = parseInt($("form").attr("id"));
	if(i === -1){
		return;
	}


	var task = {
		id: i,
		name: $("legend").text(),
		entries: getFormEntries(),
	}

	localStorage[i] = JSON.stringify(task);
} // end of function saveFormContents


function chooseEntryFromForm(){
	var id = parseInt($("form").attr("id"));
	var task = JSON.parse(localStorage[id]);
	var chosen = choice(task["entries"])
	return chosen;
} // end of function chooseEntryFromForm



function clearForm(){
	$("form").attr("id", -1);
	$("#entries").empty();
} // end of function clearForm


function addEntry(text){
	if(text === ""){
		text = choice(defaultTasks);
	}

	var wrapper = $("<li>");
	var element = $("<input>");
	element.attr("type", "text");
	element.val(text);

	element.attr("class", "entry");
	wrapper.append(element);

	var deleteButton = $("<span>")
	deleteButton.attr("class", "delete-entry-button");
	deleteButton.text("x");

	wrapper.append(deleteButton);

	wrapper.fadeIn(600);
	$("#entries").append(wrapper);
	saveFormContents();
}


function deleteTask(){
	var id = parseInt($("form").attr("id"));

	delete(localStorage[id]);
	
	$("form").attr("id", -1);

	initTasks();

}

function updateTaskPanel(){
	var id = parseInt($("form").attr("id"));
	var searchString = "#" + id;

	$(searchString).text($("legend").text());
}