$(function() {
	console.log('ready');

	var updateTime = setInterval(function(){myTimer()}, 500);

	function myTimer() {
	    var time = new Date();
	    document.getElementById("clock").innerHTML = time.toLocaleTimeString();
	}

	function playStrain() {
		document.getElementById('snd1').play();
	}

	function playWalk() {
		document.getElementById('snd2').play();
	}

	$('#startButton').click(function() {
		eyeStrain = setInterval(function() {playStrain()}, 1200000);
		walk = setInterval(function() {playWalk()}, 3600000);
	});

	$('#stopButton').click(function() {
		clearInterval(eyeStrain);
		clearInterval(walk);
	});

});

// 20 minutes = 1200000
// 60 minutes = 3600000

// Add logic to get feedback when the clock has started/how long it will take to complete the first interval.
// Add logic to alert the user when an interval has been encountered

