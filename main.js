import { Player } from './modules/player.js';
import { QuestionGenerator } from './modules/questionGenerator.js';

window.addEventListener('load', function() {
	const canvas = document.querySelector('canvas');
	const ctx = canvas.getContext('2d');

	const beforeGS = document.getElementById('beforeGS');
	const gameEndDisp = document.getElementById('gameEnd');
	const gameWinStatus = document.getElementById('gameWinner');
	const playAgainBtn = document.getElementById('playAgainBtn');
	const startBtn = document.getElementById('startBtn');

	const AIBar = document.getElementById('AIBar');
	const userBar = document.getElementById('userBar');
	const clockNumber = document.getElementById('clockNumber');

	canvas.width = 1024;
	canvas.height = 576;

	startBtn.addEventListener('click', () => {
		game.gameStart(true);
		beforeGS.style.display = 'none';
	});

	class Game {
		constructor(width, height) {
			this.gamePlay = false;
			this.gameTimer = "";
			this.startTime = 0;
			this.timeDiff = 0;
			this.playerWin = "You Win!";
			this.AIWin = "You Lose!"
			this.gameRoundTime = 101000;
			this.width = width;
			this.height = height;
			const playerPosTop = this.height - (this.height/2.5);
			this.AI = new Player(this, this.width - 924, playerPosTop, false);
			this.player = new Player(this, this.width - 100, playerPosTop, true);
			this.lifeBars = [AIBar, userBar];
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
					this.AI.life -= 10;
					this.AI.lifeDrain += 10;
				} else if (answer != "" && answer.length == solution.toString().length && !this.evaluateAns((parseInt(answer)), solution)) {
					this.questions.answerText = "wrong!";
					this.player.life -= 10;
					this.player.lifeDrain += 10;
				} else if (answer != "" && answer.length < solution.toString().length) this.questions.answerText = answer;		
			}

			this.AI.update(this.lifeBars[0], "to right");
			this.player.update(this.lifeBars[1], "to left");

			// Game end scenario when when one player dies
			if (this.AI.life == 0) this.gameEnd(this.playerWin);
			if (this.player.life == 0) this.gameEnd(this.AIWin);

			this.timeDiff = (new Date()).getTime() - this.startTime;
			clockNumber.innerText = `${Math.floor((this.gameRoundTime/1000) - (this.timeDiff/1000))}`;
		}

		evaluateAns(userAns, compAns) {
			if (userAns == compAns) return true;
			else return false;
		}

		windowEvents() {
			this.questions.outputOperation();
			this.questions.inputOperation();
		}

		clearTimeOut(timeoutID) {
			clearTimeout(timeoutID);
		}

		gameRoundTimer() {
			this.gameTimer = setTimeout(() => {
				// Game end after game round time runs out
				if (this.gamePlay) {
						if (this.gameRoundTime <= 0 && (this.questions.keyTracker || !this.questions.keyTracker)) {
							if ((this.AI.life < this.player.life)) this.gameEnd(this.playerWin);
							else if (this.AI.life > this.player.life) this.gameEnd(this.AIWin);
							else this.gameEnd("Draw");
							this.clearTimeOut(this.questions.questionTimer);
						}
					}
			}, this.gameRoundTime);
		}

		// Function when game starts. It sets gamePlay to true and starts the timer
		gameStart(bool) {
			this.gamePlay = bool;
			this.startTime = (new Date()).getTime();
			this.gameRoundTimer();
		}

		// When a game-end state is triggered whether by the game time running out or one of the player wins
		gameEnd(gamestatus) {
			this.gamePlay = false;
			gameWinStatus.innerText = gamestatus;
			gameEndDisp.style.display = 'flex';
			this.questions.questionGenerate = false;	
		}
	}


	const game = new Game(canvas.width, canvas.height);
	console.log(game);
	console.log(game.player);
	console.log(game.AI);

	playAgainBtn.addEventListener('click',() => {
		game.gameStart(true);
		gameEndDisp.style.display = 'none';
		game.gameRoundTime = 101000;
		game.AI.life = 100;
		game.player.life = 100;
		game.questions.outputOperation();
	});

	function animate() {
		if (game.gamePlay) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			game.draw(ctx);
			game.update();
		}		

		requestAnimationFrame(animate);
	}

	animate();

	game.windowEvents();
});
