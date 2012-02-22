var timer;
var twentyFiveMinutes = 1500000;

function initTimer(){
	localStorage["timerRunning"] = false;	
}

function pad(val) {
	return (""+val).length==2 ? ""+val : "0"+val;
}


function runTimer(){
	localStorage["timerRunning"] = true;
	if(! localStorage["startingTime"] ){
		localStorage["startingTime"] = +new Date;
	}
	display();

	// recursively call this everuy 100 ms
	timer = setTimeout(runTimer, 100);
} // end of function run


function playSound(){
	var audiolet = new Audiolet();

	// f, ab, db
	var frequencyPattern = new PSequence([698.46*2, 830.61*2, 1108.73*2 ], 1)
	audiolet.scheduler.play([frequencyPattern], 1./4,
		function(frequency){
			var triangle = new Triangle(audiolet, frequency);
			triangle.connect(audiolet.output);

			setTimeout(function(){
				triangle.disconnect(audiolet.output)
			}, 300);
		}
	);


} // end of function playSound


function reset(){
	delete(localStorage["startingTime"]);
	localStorage["timerRunning"] = false;
	display();
	clearTimeout(timer);

	// todo: buttons
}


function done(){
	reset()
	playSound();
}



function display(){
	if(localStorage["timerRunning"]){
		var elapsedMilliseconds = +new Date - parseInt(localStorage["startingTime"])

		// handle the progress bar
		var barLength = Math.floor((1.0 * elapsedMilliseconds / twentyFiveMinutes) * $(".body-container").css("width"));
		$(".progress-bar").css("width", barLength);


		// handle the countdown timer
		var remainingTime = twentyFiveMinutes - elapsedMilliseconds;

		var secsElapsed = Math.floor(elapsedMilliseconds%60000/1000);
		var minsElapsed = Math.floor(elapsedMilliseconds%3600000/60000);

		var secsLeft = Math.floor(remainingTime%60000/1000);
		var minsLeft = Math.floor(remainingTime%3600000/60000);

		$("#timerElapsed").innerHTML = 
			pad(minsElapsed) + ":" + pad(secsElapsed) + "/" + pad(minsLeft) + ":" + pad(secsLeft);

		// finially, if we are out of time, stop!
		if(remainingTime <= 0){
			done()
		}


		// todo: change buttons

	}else{
		$("#timerElapsed").innerHTML = "";
		$(".progress-bar").css("width", 0);

		// todo: change buttons
	}
	
} // end of function display