$(function() {
// onload functions
	console.log('main javascript ready');
	checkNotifCompatibility();
	Notification.requestPermission();
	myTimer();
	buildAnimations();
	toggleSettings();
	setCheckboxAttr();
	detectChanges();





//global vars
	var lookAwayTime = 20000;
	var strainTime = 1200000;
	var walkTime = 3300000;

	// make sure there are no errors when new values are applied when the interval is not yet running
	var eyeInterval = null;
    var walkInterval = null;

    var runningEyeVal = document.getElementById('eyeOptions').value;
    var runningWalkVal = document.getElementById('walkOptions').value;

    var completeEye;






// the clock
	function myTimer() {
	    var time = new Date();
	    document.getElementById("clock").innerHTML = time.toLocaleTimeString('en-GB');
	}
	var updateTime = setInterval(function(){myTimer()}, 500);








// Settings
	// settings menu toggle options
	$(document).mouseup(function (e) {
    var container = $("#settings_container");
    var iconExcept = $('#settingsIcon');
    	if (!container.is(e.target) && container.has(e.target).length === 0 && !iconExcept.is(e.target)) {
        	container.hide();
        	$('#settingsIcon').attr('src', '../media/settings.png');
    	}
	});
	function toggleSettings() {
		$('.settingsDiv').click(function() {
			$('#settings_container').toggle(200);
			toggleImage();
		});
	}
	function toggleImage() {
		var imgSrc = document.getElementById('settingsIcon').src;
		if ($('#settingsIcon').attr('src') == '../media/settings.png') {
			$('#settingsIcon').attr('src', '../media/close.png');
		} else if ($('#settingsIcon').attr('src') == '../media/close.png') {
			$('#settingsIcon').attr('src', '../media/settings.png');
		};
	};







// functions to run on 'apply'
	$('#apply').click(function() {
		checkTimeOption();
		compareEye();
		compareWalk();
		checkTheme();
		soundCheck();
		loadState = newState;
		$('#apply').hide();
		$('#settings_container').hide();
		$('#settingsIcon').attr('src', '../media/settings.png');
		changeNotif();
	});


	function checkTimeOption() {
		eyeVal = document.getElementById('eyeOptions').value;
		walkVal = document.getElementById('walkOptions').value;	
		switch (true) {
			case eyeVal === 'test':
				strainTime = 5000
			break;
			case eyeVal === '10 minutes':
				strainTime = 600000
			break;
			case eyeVal === '20 minutes (recommended)':
				strainTime = 1200000
			break;
			case eyeVal === '40 minutes':
				strainTime = 2400000
			break;
		}
		switch (true) {
			case walkVal === 'test':
				walkTime = 3000
			break;
			case walkVal === '30 minutes':
				walkTime = 1800000
			break;
			case walkVal === '55 minutes (recommended)':
				walkTime = 3300000
			break;
			case walkVal === '1 hour 15 minutes':
				walkTime = 4500000
			break;
		}
	}

	function checkTheme() {
		if (newState.theme === loadState.theme) {
			return
		} else if (document.getElementById('styleOptions').value === 'Autumn') {
			$('#theme').attr('href', '../styles/themeAutumn.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
		} else if (document.getElementById('styleOptions').value === 'Winter') {
			$('#theme').attr('href', '../styles/themeWinter.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
		} else if (document.getElementById('styleOptions').value === 'Spring') {
			$('#theme').attr('href', '../styles/themeSpring.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();        	
		} else if (document.getElementById('styleOptions').value === 'Summer') {
			$('#theme').attr('href', '../styles/themeSummer.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
		} else if (document.getElementById('styleOptions').value === 'Christmas') {
			$('#theme').attr('href', '../styles/themeChristmas.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
		} else if (document.getElementById('styleOptions').value === 'Halloween') {
			$('#theme').attr('href', '../styles/themeHalloween.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
		} else if (document.getElementById('styleOptions').value === 'Valentine') {
			$('#theme').attr('href', '../styles/themeValentine.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
        } else if (document.getElementById('styleOptions').value === 'Easter') {
			$('#theme').attr('href', '../styles/themeEaster.less');
			$('style[id^="less:"]').remove(); // you need to remove the less
        	less.refresh();
        	destroyAnimations();
        	buildAnimations();
        }
	}

	function soundCheck() {
  		if ($('#soundCheckbox').prop('checked')) {
			document.getElementById('eyeStrainSnd').muted = true;
  			document.getElementById('eyeComplete').muted = true;
  			document.getElementById('walkSnd').muted = true;
  			
  		} else {
  			document.getElementsByTagName('audio').muted = false;
  		}
  	}

  	function compareEye() {
  		if (eyeVal != runningEyeVal) {
			stopEverything();
		};
  	}
  	function compareWalk() {
  		if (walkVal != runningWalkVal) {
  			stopEverything();
  		}
  	}








// Counter logic and base functionality 
	function strain() {
		document.getElementById('eyeStrainSnd').play();
		$('#eyemessage').show();
		line.animate(1.0);
		displayEyeNotif();
		completeEye = setTimeout(function() {complete()}, lookAwayTime);

		function complete() {
			document.getElementById('eyeComplete').play();
			stopEye();
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
	}


	function walk() {
		document.getElementById('walkSnd').play();
		walkCountDown.set(0.0);
		$('#walkmessage').show();
		displayWalkNotif();
		restartWalk();

		function restartWalk() {
			walkCountDown.animate(1.0, {
            	duration: walkTime
			});
		}

		//I have walked - button
			$('#done').click(function() {
				stopWalk();
				restartWalk();
				clearInterval(walkInterval);
				walkInt();
			});
	}
	function stopEye() {
		$('#eyemessage').hide();
		line.set(0.0);
		strainCountDown.set(0.0);
		window.clearTimeout(completeEye);
	}
	function stopWalk() {
		$("#walkmessage").hide();
		walkCountDown.set(0.0);
	}

	//setting the intervals
	function eyeInt() {
		eyeInterval = setInterval(function() { strain() }, strainTime);
		runningEyeVal = document.getElementById('eyeOptions').value;
	}
	function walkInt() {
		walkInterval = setInterval(function() { walk() }, walkTime);
		runningWalkVal = document.getElementById('walkOptions').value;		
	}





// Initiate base logic
	// start button
	$('#startButton').click(function() {
		eyeInt();
		strainCountDown.animate(1.0, {
            duration: strainTime
		});
		walkInt();
		walkCountDown.animate(1.0,   {
            duration: walkTime
        });
        $('#startButton').attr('disabled', true);
        $('#startButton').addClass('hover');
	});

	// stop button
	$('#stopButton').click(function() {
		stopEverything();
	});

	// stop everything
	function stopEverything() {
		clearInterval(eyeInterval);
		strainCountDown.set(0.0);
		stopEye();
		clearInterval(walkInterval);
		walkCountDown.set(0.0);
		stopWalk();
		$('#startButton').removeAttr('disabled');
		$('#startButton').removeClass('hover');
	}
	







// browser notifications
	// check compatibility
	function checkNotifCompatibility() {
		if (!('Notification' in window)) {
  			console.log('this browser does not support notifications')
		} else {
			console.log('this browser supports notifications');
		};
	}

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


	function displayEyeNotif() {
		if (!('Notification' in window)) {
  			console.log('this browser does not support notifications')
		} else {
			eyeNotif = new Notification('DESK HEALTH', {
		  		body: 'Your eyes are getting tired. Look away from your screen for 20 seconds.',
		  		icon: 'media/eyeIcon.png'
			});
			eyeNotif.onclick = function() {
	    		window.focus();
			};
		};
	};
	function displayWalkNotif() {
		if (!('Notification' in window)) {
  			console.log('this browser does not support notifications')
		} else {
			walkNotif = new Notification('DESK HEALTH', {
				body: 'Time for a walk!',
				icon: 'media/walkIcon.png'
			});
			walkNotif.onclick = function() {
	    		window.focus();
			};
		};
	};







	
// logic to deal with unsaved changes
	function setCheckboxAttr() {
		if ($('#soundCheckbox').is(':checked')) {
			$('#soundCheckbox').attr('value', 'true');
		} else {
			$('#soundCheckbox').attr('value', 'false');
		}
	}
	var loadState = {
		eye: document.getElementById('eyeOptions').value,
		walk: document.getElementById('walkOptions').value,
		theme: document.getElementById('styleOptions').value,
		sound: document.getElementById('soundCheckbox').value
	}

	function detectChanges() {
		$(':input').change(function() {
			setCheckboxAttr();
			newState = {
				eye: document.getElementById('eyeOptions').value,
				walk: document.getElementById('walkOptions').value,
				theme: document.getElementById('styleOptions').value,
				sound: document.getElementById('soundCheckbox').value
			}

			if (newState.eye != loadState.eye) {
				$('#apply').show();
			} else if (newState.walk != loadState.walk) {
				$('#apply').show();
			} else if (newState.theme != loadState.theme) {
				$('#apply').show();
			} else if (newState.sound != loadState.sound) {
				$('#apply').show();
			} else {
				$('#apply').hide();
			}
		});
	};

	function changeNotif() {
		$('.toast').fadeIn(400).delay(3000).fadeOut(400);
	}








// destroy and rebuild the animations to adapt to the theme
	function setNewColor() {
		action = $('#startButton').css('background-color');
		return action;
	}

	function buildAnimations() {	
		line = new ProgressBar.Line('#progress', {
		    color: setNewColor(),
		    trailColor: '#4A4132',
		    trailWidth: 0.2,
		    strokeWidth: 1,
		    duration: lookAwayTime
		});

		strainCountDown = new ProgressBar.Circle('#cdEye', {
		    color: setNewColor(),
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

		walkCountDown = new ProgressBar.Circle('#cdWalk', {
		   	color: setNewColor(),
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
	}

	function destroyAnimations() {
		line.destroy();
		strainCountDown.destroy();
		walkCountDown.destroy();
	}
})


// known issues:

// notifications don't work in IE. Need to address this, because application crashes when it hits the first notification.
// 		possible solution found. Needs to be tested


// improvements:

// add logic to apply matching theme to date.
// set the volume of walkSound to 0.5 or sth
// collect cookies which save the entire state (theme, progress and mute)

