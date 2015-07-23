$(function() {
	console.log('main javascript ready');

//global vars
	var lookAwayTime = 20000;
	var strainTime = 1200000;
	var walkTime = 3300000;

	// make sure there are no errors when new values are applied when the interval is not yet running
	var eyeInterval = null;
    var walkInterval = null;

    var actionColor = document.getElementById('apply').style.backgroundColor;

	var line = new ProgressBar.Line('#progress', {
	    trailWidth: 0.2,
	    trailColor: '#4A4132',
	    duration: lookAwayTime,
	    strokeWidth: 1,
	    color: '#BB9229',
	});

	var strainCountDown = new ProgressBar.Circle('#cdEye', {
	    color: '#BB9229',
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
	   	color: '#BB9229',
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
	    document.getElementById("clock").innerHTML = time.toLocaleTimeString('en-GB');
	}
	myTimer();
	var updateTime = setInterval(function(){myTimer()}, 500);



// Settings
	function checkTimeOption() {
		switch (true) {
			case document.getElementById('eyeOptions').value === 'test':
				strainTime = 5000
			break;
			case document.getElementById('eyeOptions').value === '10 minutes':
				strainTime = 600000
			break;
			case document.getElementById('eyeOptions').value === '20 minutes (recommended)':
				strainTime = 1200000
			break;
			case document.getElementById('eyeOptions').value === '40 minutes':
				strainTime = 2400000
			break;
			stopEverything();
		}
		switch (true) {
			case document.getElementById('walkOptions').value === 'test':
				walkTime = 3000
			break;
			case document.getElementById('walkOptions').value === '30 minutes':
				walkTime = 1800000
			break;
			case document.getElementById('walkOptions').value === '55 minutes (recommended)':
				walkTime = 3300000
			break;
			case document.getElementById('walkOptions').value === '1 hour 15 minutes':
				walkTime = 4500000
			break;
			stopEverything();
		}	
	}

	$('#apply').click(function() {
		checkTimeOption();
		checkTheme();
		soundCheck();
		$('#settings_container').hide();
		$('.settingsIcon').attr('class', 'settingsIcon');
	});

	function checkTheme() {
		if (document.getElementById('styleOptions').value === 'Autumn') {
			$('#theme').attr('href', '../styles/themeAutumn.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
		} else if (document.getElementById('styleOptions').value === 'Winter') {
			$('#theme').attr('href', '../styles/themeWinter.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
		} else if (document.getElementById('styleOptions').value === 'Spring') {
			$('#theme').attr('href', '../styles/themeSpring.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
		} else if (document.getElementById('styleOptions').value === 'Summer') {
			$('#theme').attr('href', '../styles/themeSummer.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
		} else if (document.getElementById('styleOptions').value === 'Christmas') {
			$('#theme').attr('href', '../styles/themeChristmas.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
		} else if (document.getElementById('styleOptions').value === 'Halloween') {
			$('#theme').attr('href', '../styles/themeHalloween.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
		} else if (document.getElementById('styleOptions').value === 'Valentine') {
			$('#theme').attr('href', '../styles/themeValentine.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        } else if (document.getElementById('styleOptions').value === 'Easter') {
			$('#theme').attr('href', '../styles/themeEaster.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        }
	}

	function soundCheck() {
  		if (document.getElementById('soundCheckbox').checked) {
  			document.getElementById('eyeStrainSnd').muted = true;
  			document.getElementById('eyeComplete').muted = true;
  			document.getElementById('walkSnd').muted = true;
  		};
  	}




// defining what happens 
	function strain() {
		document.getElementById('eyeStrainSnd').play();
		$('#eyemessage').show();
		line.animate(1.0);
		strainCountDown.set(0.0);
		var eyeNotif = new Notification('DESK HEALTH', {
	  		body: 'Your eyes are getting tired. Look away from your screen for 20 seconds.',
	  		icon: 'media/eyeIcon.png'
		});
		setTimeout(function() {complete()}, lookAwayTime);

		function complete() {
			document.getElementById('eyeComplete').play();
			$('#eyemessage').hide();
			eyeNotif.close();
			line.set(0.0);
			restartEye();
		}
		// clear the interval and restart the whole function
		function restartEye() {
			clearInterval(eyeInterval);
			eyeInt();
			strainCountDown.animate(1.0, {
	            duration: strainTime
			});
		}

		eyeNotif.onclick = function() {
    		window.focus();
		};
	}


	function walk() {
		document.getElementById('walkSnd').play();
		walkCountDown.set(0.0);
		$('#walkmessage').show();
		var walkNotif = new Notification('DESK HEALTH', {
			body: 'Time for a walk!',
			icon: 'media/walkIcon.png'
		});
		restartWalk();

		function restartWalk() {
			walkCountDown.animate(1.0, {
            	duration: walkTime
			});
		}

		//I have walked - button
			$('#done').click(function() {
				$("#walkmessage").hide();
				walkCountDown.set(0.0);
				walkNotif.close();
				restartWalk();
				clearInterval(walkInterval);
				walkInt();
			});
		
		walkNotif.onclick = function() {
    		window.focus();
		};
	}


	//setting the intervals
	function eyeInt() {
		eyeInterval = setInterval(function() { strain() }, strainTime);
	}
	function walkInt() {
		walkInterval = setInterval(function() { walk() }, walkTime);
	}

	// starting to count
	$('#startButton').click(function() {
		eyeInt();
		strainCountDown.animate(1.0, {
            duration: strainTime
		});
		walkInt();
		walkCountDown.animate(1.0,   {
            duration: walkTime
        });
	});
	
	// stop everything
	function stopEverything() {
		clearInterval(eyeInterval);
		strainCountDown.set(0.0);
		clearInterval(walkInterval);
		walkCountDown.set(0.0);
	}

	//stop button
	$('#stopButton').click(function() {
		stopEverything();
	});
	
	

	function toggleSettings() {
		$('.settingsIcon').click(function() {
			$('#settings_container').toggle(200);
			$('.settingsIcon').toggleClass('closeIcon', 800);
		});
	}
	toggleSettings();




	function checkNotifCompatibility() {
		if (!('Notification' in window)) {
  			console.log('this browser does not support notifications')
		} else {
			console.log('this browser supports notifications')
		};
	}
	checkNotifCompatibility();

// request notification permissions to user (required)
	Notification.requestPermission(function(result) {
  		if (result === 'denied') {
    		console.log('Permission wasn\'t granted. Allow a retry.');
    		return;
  		} else if (result === 'granted') {
  			console.log('Permission was granted. The user will receive notifications');
  			return;
  		} else if (result === 'default') {
    		console.log('the user has not responded just yet');
    		return;
  		}
  	});
  	Notification.requestPermission();

})


// known issues:
// stopButton doesn't work correctly when js is in function (strain and walk). Needs to be addressed.
// I need to find a solution to the color of the animations... they need to take the 'action' color.


// add logic to apply matching theme to date.


// 20 minutes = 1200000
// 55 minutes = 3300000
// testTimes = 3000, 5000, 10000
