$(function() {
	console.log('ready');

//global vars
	var lookAwayTime = 3000;
	var strainTime = 5000;
	var walkTime = 60000;


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

	// strainCountDown.animate(1.0);
	// walkCountDown.animate(1.0);


// the clock
	function myTimer() {
	    var time = new Date();
	    document.getElementById("clock").innerHTML = time.toLocaleTimeString();
	}

	var updateTime = setInterval(function(){myTimer()}, 500);



// the functions to play the audio files & show messages
	function playStrain() {
		document.getElementById('eyeStrainSnd').play();
		$('#eyemessage').show();
		line.animate(1.0);

		//remove message + play completion sound after 20 secs
		function eyeComplete() {
			$('#eyemessage').hide(); 
			document.getElementById('eyeComplete').play();
			//reset animations
			line.set(0.0);
		}
		setTimeout(function() { eyeComplete(); }, lookAwayTime)
	}

	function playWalk() {
		document.getElementById('walkSnd').play();
		$('#walkmessage').show();

		//TODO: provide option + logic for 'done'
			$('#done').click(function() {
				$("#walkmessage").hide();
			});
	}


// the functions to set the interval on the play functions
	function eyeStrain() {
		eyeStrainInt = setInterval(function() { playStrain() }, strainTime);
	}

	function walkAround() {
		walkInt = setInterval(function() { playWalk() }, walkTime);
	}



// the actions on the buttons
	$('#startButton').click(function() {
		eyeStrain();
		walkAround();
	});

	$('#stopButton').click(function() {
		clearInterval(eyeStrainInt);
		clearInterval(walkInt);
	});

});



