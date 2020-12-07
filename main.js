storage = window.localStorage;

let pausebtn = document.getElementById('pause-btn');
let resetbtn = document.getElementById('reset-btn');
let startbtn = document.getElementById('start-btn');
let resumebtn = document.getElementById('resume-btn');
let breakResumebtn = document.getElementById('break-resume');
let breakPausebtn = document.getElementById('break-pause');
let breakResetbtn = document.getElementById('break-reset');
let shortBreakbtn = document.getElementById('short-btn');
let longBreakbtn = document.getElementById('long-btn');

let textContent = document.getElementById('textarea');
textContent.addEventListener('onchange', saveStorage());

let workTime = 30 * 60; // 30 Minutes

window.onload = function() {
	textContent.value = storage.getItem('content') || '';
}

function saveStorage() {
	console.log(textContent.value);
	storage.setItem('content', textContent.value);
}

function resetTimer(foo) {
	if (foo === 'reset') {
		workBar.set(0);
		pausebtn.style.display = 'none';
		resetbtn.style.display = 'none';
		startbtn.style.display = 'inline-block';
		resumebtn.style.display = 'none';
	} else if (foo === 'start') { // If no bar is running and start is pressed
		workBar.set(0);
		workTime = 30 * 60;
		workBar.animate(1.0, {
			duration: workTime * 1000,
			step: function (state, circle) {
				var value = workTime - circle.value() * workTime;  // circle.value ranges from 0 to 1
				finalValue = new Date(value * 1000).toISOString().substr(14, 5); // cool 1 liner to convert time to M:S
				if (value === 0) {
					circle.setText(new Date(workTime * 1000).toISOString().substr(14, 5));
				}
				else if (circle.value() == 1.0) { // If progressbar ends organically
					startbtn.style.display = 'inline-block';
					pausebtn.style.display = 'none';
					resetbtn.style.display = 'none';
					resumebtn.style.display = 'none';
				} else {
					circle.setText(finalValue);
				}
			}
		});
		startbtn.style.display = 'none';
		pausebtn.style.display = 'inline-block';
		resetbtn.style.display = 'inline-block';
		resumebtn.style.display = 'none';
	} else if (foo === 'pause') {
		workBar.stop();
		pausebtn.style.display = 'none';
		resumebtn.style.display = 'inline-block';
		resetbtn.style.display = 'inline-block';
	} else if (foo === 'resume') {
		workBar.animate(1.0, {
			duration: workTime * 1000,
			step: function (state, circle) {
				var value = workTime - circle.value() * workTime;  // circle.value ranges from 0 to 1
				finalValue = new Date(value * 1000).toISOString().substr(14, 5); // cool 1 liner to convert time to M:S
				if (value === 0) {
					circle.setText(new Date(workTime * 1000).toISOString().substr(14, 5));
				}
				else if (circle.value() == 1.0) { // If progressbar ends organically
					startbtn.style.display = 'inline-block';
					pausebtn.style.display = 'none';
					resetbtn.style.display = 'none';
					resumebtn.style.display = 'none';
				} else {
					circle.setText(finalValue);
				}
			}
		});
		pausebtn.style.display = 'inline-block';
		resumebtn.style.display = 'none';
		resetbtn.style.display = 'inline-block';
	} else if (foo === 'short-break') {
		document.body.style.backgroundColor = '#435066';
		startbtn.style.display = 'none';
		pausebtn.style.display = 'none';
		resetbtn.style.display = 'none';
		resumebtn.style.display = 'none';

		breakResumebtn.style.display = 'none';
		breakPausebtn.style.display = 'inline-block';
		breakResetbtn.style.display = 'inline-block';
		shortBreakbtn.style.visibility = 'hidden';
		longBreakbtn.style.visibility = 'hidden';
		workTime = 5 * 60;
		shortBreak();
	}
	else if (foo === 'long-break') {
		document.body.style.backgroundColor = '#435066';
		startbtn.style.display = 'none';
		pausebtn.style.display = 'none';
		resetbtn.style.display = 'none';
		resumebtn.style.display = 'none';

		breakResumebtn.style.display = 'none';
		breakPausebtn.style.display = 'inline-block';
		breakResetbtn.style.display = 'inline-block';
		shortBreakbtn.style.visibility = 'hidden';
		longBreakbtn.style.visibility = 'hidden';

		workTime = 15 * 60;
		shortBreak();
	}
	else if (foo === 'breakResume') { // If resume button is pressed while there is a break
		workBar.animate(1.0, {
			duration: workTime * 1000,
			step: function (state, circle) {
				var value = workTime - circle.value() * workTime;  // circle.value ranges from 0 to 1
				finalValue = new Date(value * 1000).toISOString().substr(14, 5); // cool 1 liner to convert time to M:S
				if (value === 0) {
					circle.setText(new Date(workTime * 1000).toISOString().substr(14, 5));
				}
				else if (circle.value() == 1.0) { // If progressbar ends organically
					startbtn.style.display = 'inline-block';
					pausebtn.style.display = 'none';
					resetbtn.style.display = 'none';
					resumebtn.style.display = 'none';
				} else {
					circle.setText(finalValue);
				}
			}
		});
		breakResumebtn.style.display = 'none';
		breakPausebtn.style.display = 'inline-block';
		breakResetbtn.style.display = 'inline-block';
	} else if (foo === 'breakPause') { // If pause button is pressed while there is a break 
		workBar.stop();
		breakResumebtn.style.display = 'inline-block';
		breakPausebtn.style.display = 'none';
		breakResetbtn.style.display = 'inline-block';
	} else if (foo === 'breakReset') { // If reset button is pressed while there is a break 
		breakResumebtn.style.display = 'none';
		breakPausebtn.style.display = 'none';
		breakResetbtn.style.display = 'none';
		shortBreakbtn.style.visibility = 'visible';
		longBreakbtn.style.visibility = 'visible';
		startbtn.style.display = 'inline-block';
		document.body.style.backgroundColor = '#2d3748';
		workTime = 30 * 60;
		workBar.set(0);
	}
}

var workBar = new ProgressBar.Circle('#timer', {
	color: '#F54141',
	strokeWidth: 8,
	trailWidth: 4,
	duration: workTime * 1000,
	text: {
		autoStyleContainer: false
	},
	from: { color: '#F54141' },
	to: { color: '#F54141' },
	// Set default step function for all animate calls
	step: function (state, circle) {
		circle.path.setAttribute('stroke', state.color);
		circle.path.setAttribute('stroke-width', state.width);
		var value = workTime - circle.value() * workTime;  // circle.value ranges from 0 to 1
		finalValue = new Date(value * 1000).toISOString().substr(14, 5); // cool 1 liner to convert time to M:S
		if (value === 0) {
			circle.setText(new Date(workTime * 1000).toISOString().substr(14, 5));
		} else {
			circle.setText(finalValue);
		}
		if (circle.value() == 1.0) { // If progressbar ends organically
			startbtn.style.display = 'inline-block';
			pausebtn.style.display = 'none';
			resetbtn.style.display = 'none';
			resumebtn.style.display = 'none';
		}
	}
});
workBar.text.style.fontSize = '4rem';

function shortBreak() {
	workBar.animate(1.0, {
		duration: workTime * 1000,
		step: function (state, circle) {
			var value = workTime - circle.value() * workTime;  // circle.value ranges from 0 to 1
			finalValue = new Date(value * 1000).toISOString().substr(14, 5); // cool 1 liner to convert time to M:S
			if (value === 0) {
				circle.setText(new Date(workTime * 1000).toISOString().substr(14, 5));
			}
			else if (circle.value() == 1.0) { // If progressbar ends organically
				startbtn.style.display = 'inline-block';
				pausebtn.style.display = 'none';
				resetbtn.style.display = 'none';
				resumebtn.style.display = 'none';
			} else {
				circle.setText(finalValue);
			}
		}
	});
}

function startWork() {
	workBar.animate(1.0, {
		duration: workTime * 1000,
		step: function (state, circle) {
			var value = workTime - circle.value() * workTime;  // circle.value ranges from 0 to 1
			finalValue = new Date(value * 1000).toISOString().substr(14, 5); // cool 1 liner to convert time to M:S
			if (value === 0) {
				circle.setText(new Date(workTime * 1000).toISOString().substr(14, 5));
			}
			else if (circle.value() == 1.0) { // If progressbar ends organically
				startbtn.style.display = 'inline-block';
				pausebtn.style.display = 'none';
				resetbtn.style.display = 'none';
				resumebtn.style.display = 'none';
			} else {
				circle.setText(finalValue);
			}
		}
	});
}