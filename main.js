window.addEventListener('load', function(){
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 1024;
	canvas.height = 576;

	class Game {
		constructor(width, height){
			this.width = width;
			this.height = height;
		}

		timeDisplay(context){
			context.fillStyle = 'blue';
			context.fillRect(0, 0, this.width, this.height * 0.15);
		}


	}

	const game = new Game(canvas.width, canvas.height);
	console.log(game);

	function animate() {

		//requestAnimationFrame(animate);
	}

	//animate();

});

// Game properties

// time display

// player creation