$(function() {
	console.log('ready');

//global vars
	var lookAwayTime = 3000;
	var strainTime = 5000;
	var walkTime = 10000;

	var line = new ProgressBar.Line('#progress', {
	    trailWidth: 0,
	    duration: lookAwayTime,
	    strokeWidth: 1,
	    color: '#BB9229',
	});

	var strainCountDown = new ProgressBar.Circle('#cdEye', {
	    color: '#FCB03C',
	    trailColor: '#4A4132',
	    trailWidth: 0.2,
	    strokeWidth: 4,
	    duration: strainTime
	});

	var walkCountDown = new ProgressBar.Circle('#cdWalk', {
	   	color: '#FCB03C',
	    trailColor: '#4A4132',
	    trailWidth: 0.2,
	    strokeWidth: 4,
	    duration: walkTime
	});	

		// 
	// walkCountDown.animate(1.0);


// the clock
	function myTimer() {
	    var time = new Date();
	    document.getElementById("clock").innerHTML = time.toLocaleTimeString();
	}

	var updateTime = setInterval(function(){myTimer()}, 500);


// defining what happens 
	function strain() {
		document.getElementById('eyeStrainSnd').play();
		$('#eyemessage').show();
		line.animate(1.0);
		strainCountDown.set(0.0);
		setTimeout(function() {complete()}, lookAwayTime);

		function complete() {
			document.getElementById('eyeComplete').play();
			$('#eyemessage').hide();
			line.set(0.0);
			restartEye();
		}
		// clear the interval and restart the whole function
		function restartEye() {
			clearInterval(eyeInterval);
			eyeInt();
			strainCountDown.animate(1.0);
		}
	}


	function walk() {
		document.getElementById('walkSnd').play();
		walkCountDown.set(0.0);
		$('#walkmessage').show();
		restartWalk();

		function restartWalk() {
			walkCountDown.animate(1.0);
		}

		//I have walked - button
			$('#done').click(function() {
				$("#walkmessage").hide();
				walkCountDown.set(0.0);
				restartWalk();
				clearInterval(walkInterval);
				walkInt();
			});
	}


	//setting the intervals
	function eyeInt() {
		eyeInterval = setInterval(function() { strain() }, strainTime);
	}
	function walkInt() {
		walkInterval = setInterval(function() {walk()}, walkTime);
	}


	// starting to count
	$('#startButton').click(function() {
		eyeInt();
		strainCountDown.animate(1.0);
		walkInt();
		walkCountDown.animate(1.0);
	});
	// clearing the intervals
	$('#stopButton').click(function() {
		clearInterval(eyeInterval);
		clearInterval(walkInterval);
		walkCountDown.set(0.0);
		strainCountDown.set(0.0);
	});
})


// known issues:
// stopButton doesn't work correctly when js is in function (strain and walk). Needs to be addressed.


// 20 minutes = 1200000
// 55 minutes = 3300000

// Add logic to get feedback when the clock has started/how long it will take to complete the first interval.
// Add logic to display clock immediately instead of after first timeout...