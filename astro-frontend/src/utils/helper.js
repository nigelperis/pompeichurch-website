document.addEventListener('DOMContentLoaded', () => {
	// const body = document.body;
	const curtainContainer = document.querySelector('.curtain-container');
	const toggleButton = document.getElementById('toggleCurtain');
	const balloonContainer = document.getElementById('balloon-container');
	const canvas = document.getElementById('confetti-canvas');
	const ctx = canvas.getContext('2d');
	const timerContainer = document.querySelector('.timer-container');
	const timerPath = document.querySelector('.timer-path');
	const timerText = document.querySelector('.timer-text');

	let W = window.innerWidth;
	let H = window.innerHeight;
	const maxConfettis = 150;
	const particles = [];

	const possibleColors = [
		'DodgerBlue',
		'OliveDrab',
		'Gold',
		'Pink',
		'SlateBlue',
		'LightBlue',
		'Violet',
		'PaleGreen',
		'SteelBlue',
		'SandyBrown',
		'Chocolate',
		'Crimson',
	];

	let animationFrameId = null;
	let animationTimeout = null;
	let timerInterval = null;
	const FULL_DASH_ARRAY = 283; // 2 * π * r, where r = 45 (SVG circle radius)
	const TIME_LIMIT = 5;
	let timePassed = 0;
	let timeLeft = TIME_LIMIT;

	function randomFromTo(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	function confettiParticle() {
		this.x = Math.random() * W;
		this.y = Math.random() * H - H;
		this.r = randomFromTo(11, 33);
		this.d = Math.random() * maxConfettis + 11;
		this.color =
			possibleColors[Math.floor(Math.random() * possibleColors.length)];
		this.tilt = Math.floor(Math.random() * 33) - 11;
		this.tiltAngleIncremental = Math.random() * 0.07 + 0.05;
		this.tiltAngle = 0;

		this.draw = function () {
			ctx.beginPath();
			ctx.lineWidth = this.r / 2;
			ctx.strokeStyle = this.color;
			ctx.moveTo(this.x + this.tilt + this.r / 3, this.y);
			ctx.lineTo(this.x + this.tilt, this.y + this.tilt + this.r / 5);
			return ctx.stroke();
		};
	}

	function Draw() {
		ctx.clearRect(0, 0, W, H);

		for (let i = 0; i < maxConfettis; i++) {
			particles[i].draw();
		}

		Update();

		animationFrameId = requestAnimationFrame(Draw);
	}

	function Update() {
		let particle;
		for (let i = 0; i < maxConfettis; i++) {
			particle = particles[i];

			particle.tiltAngle += particle.tiltAngleIncremental;
			particle.y += (Math.cos(particle.d) + 3 + particle.r / 2) / 2;
			particle.tilt = Math.sin(particle.tiltAngle - i / 3) * 15;

			if (particle.y > H) {
				particle.x = Math.random() * W;
				particle.y = -30;
				particle.tilt = Math.floor(Math.random() * 10) - 20;
			}
		}
	}

	function initializeConfetti() {
		particles.length = 0;
		for (let i = 0; i < maxConfettis; i++) {
			particles.push(new confettiParticle());
		}
	}

	function resizeCanvas() {
		W = window.innerWidth;
		H = window.innerHeight;
		canvas.width = W;
		canvas.height = H;
	}

	function toggleConfetti(start) {
		if (start) {
			initializeConfetti();
			if (!animationFrameId) {
				Draw();
			}
		} else {
			if (animationFrameId) {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
			}
			ctx.clearRect(0, 0, W, H);
		}
	}

	function random(num) {
		return Math.floor(Math.random() * num);
	}

	function getRandomStyles() {
		var r = random(255);
		var g = random(255);
		var b = random(255);
		var mt = random(200);
		var ml = random(50);
		var dur = random(5) + 5;
		return `
            background-color: rgba(${r},${g},${b},0.7);
            color: rgba(${r},${g},${b},0.7);
            box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${
							b - 10
						},0.7);
            margin: ${mt}px 0 0 ${ml}px;
            animation: float ${dur}s ease-in infinite
            `;
	}

	function createBalloons(num) {
		for (var i = num; i > 0; i--) {
			var balloon = document.createElement('div');
			balloon.className = 'balloon';
			balloon.style.cssText = getRandomStyles();
			balloonContainer.append(balloon);
		}
	}

	function removeBalloons() {
		balloonContainer.style.opacity = 0;
		setTimeout(() => {
			balloonContainer.innerHTML = '';
		}, 500);
	}

	function startTimer() {
		timerInterval = setInterval(() => {
			timePassed += 1;
			timeLeft = TIME_LIMIT - timePassed;
			timerText.textContent = timeLeft;

			setCircleDasharray();

			if (timeLeft === 0) {
				clearInterval(timerInterval);
				timerContainer.style.display = 'none';
				toggleCurtainAndAnimations();
			}
		}, 1000);
	}

	function setCircleDasharray() {
		const circleDasharray = `${(
			(timeLeft / TIME_LIMIT) *
			FULL_DASH_ARRAY
		).toFixed(0)} ${FULL_DASH_ARRAY}`;
		timerPath.setAttribute('stroke-dasharray', circleDasharray);
	}

	function resetTimer() {
		clearInterval(timerInterval);
		timePassed = 0;
		timeLeft = TIME_LIMIT;
		timerText.textContent = timeLeft;
		setCircleDasharray();
	}

	function toggleCurtainAndAnimations() {
		curtainContainer.classList.toggle('closed');
		curtainContainer.classList.toggle('open');

		if (curtainContainer.classList.contains('open')) {
			toggleButton.style.display = 'none';
			setTimeout(() => {
				balloonContainer.style.opacity = 1;
				createBalloons(30);
				toggleConfetti(true);
				animationTimeout = setTimeout(() => {
					removeBalloons();
					toggleConfetti(false);
					// Optionally, you can add a transition here to fade out the curtain container
					curtainContainer.style.transition = 'opacity 1s ease-out';
					curtainContainer.style.opacity = '0';
					// After the transition, you can hide the curtain container completely
					setTimeout(() => {
						curtainContainer.style.display = 'none';
					}, 1000);
				}, 5000);
			}, 1000); // Delay to match curtain opening animation
		} else {
			removeBalloons();
			toggleConfetti(false);
			if (animationTimeout) {
				clearTimeout(animationTimeout);
				animationTimeout = null;
			}
			toggleButton.style.display = 'block';
			toggleButton.textContent = 'Start Timer';
			resetTimer();
			// Reset the curtain container
			curtainContainer.style.transition = '';
			curtainContainer.style.opacity = '1';
			curtainContainer.style.display = 'block';
		}
	}

	toggleButton.addEventListener('click', () => {
		if (curtainContainer.classList.contains('closed')) {
			timerContainer.style.display = 'block';
			toggleButton.style.display = 'none';
			startTimer();
		} else {
			toggleCurtainAndAnimations();
		}
	});

	// Initial state
	resizeCanvas();
	window.addEventListener('resize', resizeCanvas);
});