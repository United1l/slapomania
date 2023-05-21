import { Player } from './modules/player.js';
import { QuestionGenerator } from './modules/questionGenerator.js';

window.addEventListener('load', function() {
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 1024;
	canvas.height = 576;

	class Game {
		constructor(width, height) {
			this.width = width;
			this.height = height;
			var playerCorrect;
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

			var solution;
			if(this.questions.questionGenerate) solution = eval(question);

			if (answer != "" && answerTextLength(answer, solution)) {
				console.log(solution);
				this.playerCorrect = true;
				this.questions.answerText = "correct!";
			} else if (!answerTextLength(answer, solution)) this.playerCorrect = false; 
			  else if (answer != "" && !answerTextLength(answer, solution)){
				this.playerCorrect = false;
				this.questions.answerText = "wrong!";
				}

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

	game.windowEvents();

	// Function that takes an unknown array's length and tries to match it to an array of sorted numbers in order to find a value == its length 
	function answerTextLength(answerString, compSolution) {
		var evaluateAns;
		let answerLength = answerString.length;
		let solutionString = compSolution;
		
		if (game.keyTracker) {
			if (eval(answerString) == compSolution) evaluateAns = true;
			else if ((answerLength == solutionString) && (eval(answerString) != compSolution)) evaluateAns = false;
		}

		return evaluateAns; 
	}
	
	function animate() {		
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.draw(ctx);
		game.update();

		requestAnimationFrame(animate);
	} 

	animate();
});
