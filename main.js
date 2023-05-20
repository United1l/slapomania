import { Player } from './modules/player.js';
import { QuestionGenerator } from './modules/questionGenerator.js';

window.addEventListener('load', function(){
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = 1024;
	canvas.height = 576;

	class Game {
		constructor(width, height){
			this.width = width;
			this.height = height;
			this.playerCorrect = null;
			const playerPosTop = this.height/2.5;
			this.AI = new Player(this, this.width/9, playerPosTop);
			this.player = new Player(this, this.width/1.13, playerPosTop);
			this.questions = new QuestionGenerator();
		}

		overHeadBanner(context){
			const bannerHeight = this.height * 0.189;
			context.fillStyle = 'green';
			context.fillRect(0, 0, this.width, bannerHeight);
			context.fillStyle = 'white';
			context.beginPath();
			context.arc(this.width/2, bannerHeight/2, bannerHeight/2, 0, Math.PI * 2, false);
			context.fill();

			const lifeBarWidth = this.width/2.3;
			this.AI.lifeBar(context, 0, 0, lifeBarWidth, bannerHeight, true);
			this.player.lifeBar(context, this.width/1.77, 0, lifeBarWidth, bannerHeight, true);
		}

		draw(context){
			this.overHeadBanner(context);
			this.AI.draw(context);
			this.player.draw(context);
			this.questions.draw(context, this.width/1.7, this.height/1.5);
		}

		update(){
			this.questions.inputOperation();
			this.questions.outputOperation();

			if (this.playerCorrect != null) setTimeout(
					this.questions.answerText = "", 2000
				);
		}


	}

	const game = new Game(canvas.width, canvas.height);
	console.log(game);
	console.log(game.player);
	console.log(game.AI);

	game.update();
	
	function animate() {		
		ctx.clearRect(0, 0, canvas.width, canvas.height)
		game.draw(ctx);

		let question = game.questions.questionText;
		let answer = game.questions.answerText;

		if (answer != "" && answer.length > 2) {
			let solution = parseInt(question);
			console.log(solution);
			if (parseInt(answer) == solution) {
				game.playerCorrect = true;
				game.questions.answerText = "correct!";
			}
			else {
				game.playerCorrect = false;
				game.questions.answerText = "wrong!";
			}
		}

		requestAnimationFrame(animate);
	} 

	animate();
});
