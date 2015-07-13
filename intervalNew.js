$(function() {
	console.log('ready');

//global vars
	var lookAwayTime = 20000;
	var strainTime = 1200000;
	var walkTime = 3300000;

	var line = new ProgressBar.Line('#progress', {
	    trailWidth: 0.2,
	    trailColor: '#4A4132',
	    duration: lookAwayTime,
	    strokeWidth: 1,
	    color: '#BB9229',
	});

	var strainCountDown = new ProgressBar.Circle('#cdEye', {
	    color: '#FCB03C',
	    trailColor: '#4A4132',
	    trailWidth: 0.2,
	    strokeWidth: 4,
	    duration: strainTime,
	    text: {
        value: '0'
    	},
    		step: function(state, shape) {
        		shape.setText((shape.value() * 100 ).toFixed(0) + "%");
    		}
	});

	var walkCountDown = new ProgressBar.Circle('#cdWalk', {
	   	color: '#FCB03C',
	    trailColor: '#4A4132',
	    trailWidth: 0.2,
	    strokeWidth: 4,
	    duration: walkTime,
	    text: {
        value: '0'
    	},
    		step: function(state, shape) {
        		shape.setText((shape.value() * 100 ).toFixed(0) + "%");
    		}	    
	});	


// the clock
	function myTimer() {
	    var time = new Date();
	    document.getElementById("clock").innerHTML = time.toLocaleTimeString();
	}
	myTimer();
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
		strainCountDown.set(0.0);
		clearInterval(walkInterval);
		walkCountDown.set(0.0);
	});
})


// known issues:
// stopButton doesn't work correctly when js is in function (strain and walk). Needs to be addressed.


// 20 minutes = 1200000
// 55 minutes = 3300000
// testTimes = 3000, 5000, 10000

// Add logic to display every second in the countdowntimers (every 1000 miliseconds get value() en bereken wat hij moet tonen)
