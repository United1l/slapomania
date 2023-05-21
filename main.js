import { Player } from './modules/player.js';
import { QuestionGenerator } from './modules/questionGenerator.js';

window.addEventListener('load', function() {
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	const AIBar = document.getElementById('AIBar');
	const userBar = document.getElementById('userBar');
	const clockNumber = document.getElementById('clockNumber');

	canvas.width = 1024;
	canvas.height = 576;

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			const playerPosTop = this.height/2.5;
			this.AI = new Player(this, this.width/9, playerPosTop);
			this.player = new Player(this, this.width/1.13, playerPosTop);
			this.questions = new QuestionGenerator(this);
		}

		draw(context) {
			this.AI.draw(context);
			this.player.draw(context);
			this.questions.draw(context, this.width/1.7, this.height/1.5);
		}

		update() { 
			let question = this.questions.questionText;
			let answer = this.questions.answerText;

			let solution = this.questions.solution;

			if (this.questions.keyTracker) {
				if (answer != ""  && answer.length == solution.toString().length && this.evaluateAns((parseInt(answer)), solution)) {
					this.questions.answerText = "correct!";
				} else if (answer != "" && answer.length == solution.toString().length && !this.evaluateAns((parseInt(answer)), solution)) {
					this.questions.answerText = "wrong!";
				} else if (answer != "" && answer.length < solution.toString().length) this.questions.answerText = answer;
				

			}
		}	


			evaluateAns(userAns, compAns) {
				if (userAns == compAns) return true;
				else return false;
			}

		windowEvents() {
			this.questions.outputOperation();
			this.questions.inputOperation();
		}
	}


	const game = new Game(canvas.width, canvas.height);
	console.log(game);
	console.log(game.player);
	console.log(game.AI);
	
	function animate() {		
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.draw(ctx);
		game.update();

		requestAnimationFrame(animate);
	} 

	animate();

	game.windowEvents();
});
