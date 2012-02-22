var timer;
var twentyFiveMinutes = 1500000;
var keepGoing = true;

function initTimer(){
	delete(sessionStorage["timerRunning"]);
	delete(sessionStorage["startingTime"]);
}

function pad(val) {
	return (""+val).length==2 ? ""+val : "0"+val;
}


function runTimer(){
	sessionStorage["timerRunning"] = true;
	if(! sessionStorage["startingTime"] ){
		sessionStorage["startingTime"] = +new Date;
	}
	display();

	// recursively call this everuy 100 ms
	if(keepGoing){
		timer = setTimeout(runTimer, 100);
	}
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
	delete(sessionStorage["startingTime"]);
	delete(sessionStorage["timerRunning"]);
	//sessionStorage["timerRunning"] = false;
	display();
	clearTimeout(timer);

	// todo: buttons
}


function done(){
	reset();
	keepGoing = false;
	playSound();
	updateHeader("");
	setTimeout(function(){keepGoing = true}, 500);
}



function display(){
	if(sessionStorage["timerRunning"]){
		
		var elapsedMilliseconds = +new Date - parseInt(sessionStorage["startingTime"])

		// handle the progress bar
		var barLength = Math.floor((1.0 * elapsedMilliseconds / twentyFiveMinutes) * $(".body-container").width());
		$(".progress-bar").width(barLength);


		// handle the countdown timer
		var remainingTime = twentyFiveMinutes - elapsedMilliseconds;

		var secsElapsed = Math.floor(elapsedMilliseconds%60000/1000);
		var minsElapsed = Math.floor(elapsedMilliseconds%3600000/60000);

		var secsLeft = Math.floor(remainingTime%60000/1000);
		var minsLeft = Math.floor(remainingTime%3600000/60000);

		$("#timerElapsed").html( 
			pad(minsElapsed) + ":" + pad(secsElapsed) + "/" + pad(minsLeft) + ":" + pad(secsLeft)
		);

		// finially, if we are out of time, stop!
		if(remainingTime <= 0){
			done();
		}


		// todo: change buttons

	}else{
		//sessionStorage["timerRunning"] = false;
		$("#timerElapsed").html("");
		$(".progress-bar").width(0);

		// todo: change buttons
	}
	
} // end of function display


function updateHeader(newText){
	if(newText == ""){
		$("h1").fadeOut(700);
		$("h1").html("Tireless");
		$("h1").fadeIn(700);
	}
	else{
		$("h1").fadeOut(700);
		$("h1").html("Tireless: " + newText);	
		$("h1").fadeIn(700);
	}
	
} // end of function updateHeader