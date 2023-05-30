import { Player } from './components/player.mjs';
import { QuestionGenerator } from './components/questionGenerator.mjs';
import { GameAudio } from './components/audio.mjs';

window.addEventListener('load', function() {
	const canvas = document.getElementById('paper');
	const ctx = canvas.getContext('2d');

	const beforeGS = document.getElementById('beforeGS');
	const gameEndDisp = document.getElementById('gameEnd');
	const gameWinStatus = document.getElementById('gameWinner');
	const playAgainBtn = document.getElementById('playAgainBtn');
	const startBtn = document.getElementById('startBtn');

	const aIbar = document.getElementById('AIBar');
	const aIscore = document.getElementById('AIscore');
	const userBar = document.getElementById('userBar');
	const userscore = document.getElementById('playerScore');
	const clockNumber = document.getElementById('clockNumber');

	canvas.width = 1024;
	canvas.height = 576;

	startBtn.addEventListener('click', () => {
		game.gameStart(true);
		beforeGS.style.display = 'none';
	});


	playAgainBtn.addEventListener('click', () => {
		game.gameStart(true);
		gameEndDisp.style.display = 'none';
		game.questions.outputOperation();
		game.lifeDecrAI = 0;
		game.lifeDecrPlayer = 0;
	});


	class Game {
		constructor(width, height) {
			this.gamePlay = false;
			this.gameTimer = "";
			this.gameRoundTime = 121000;
			this.width = width;
			this.height = height;

			this.startTime = 0;
			this.timeDiff = 0;
			this.playerWin = "You Win!";
			this.AIWin = "You Lose!";
			
			const playerPosTop = this.height/8;
			this.AI = new Player(this, this.width - 974, playerPosTop);
			this.player = new Player(this, this.width - 300, playerPosTop);
			this.lifeBars = [aIbar, userBar];
			this.lifeDecrAI = 0;
			this.lifeDecrPlayer = 0;

			this.questions = new QuestionGenerator(this);
			this.gameSounds = new GameAudio();
			this.gamePlaySound = this.gameSounds.getAudio(this.gameSounds.soundsArray[0]);
			}

		draw(context) {
			this.AI.draw(context, this.AI.playerImage, this.AI.handImage, this.AI.handW, this.AI.handH, this.AI.flip);
			this.player.draw(context, this.player.playerImage, this.player.handImage, this.player.handW, this.player.handH, this.player.flip);
			this.questions.draw(context, this.width/1.7, this.height/1.4);
		}

		update() { 
			let question = this.questions.questionText;
			let answer = this.questions.answerText;

			let solution = this.questions.solution;

			// Question evaluation
			if (this.questions.keyTracker) {
				if (answer != ""  && answer.length == solution.toString().length && this.evaluateAns((parseInt(answer)), solution)) {
					this.questions.answerText = "correct!";
					this.AI.life -= 10;
					this.lifeDecrAI -= 10;
					
					this.player.slap('player', this.player.Slap);
					this.questions.questionGenerate = false;
				} 
				else if (answer != "" && answer.length == solution.toString().length && !this.evaluateAns((parseInt(answer)), solution)) {
					this.questions.answerText = "wrong!";
					this.player.life -= 10;
					this.lifeDecrPlayer += 10;

					this.AI.slap('AI', this.AI.Slap);
					this.questions.questionGenerate = false;
				} 
				else if (answer != "" && answer.length < solution.toString().length) this.questions.answerText = answer;		
			}

			this.lifeBars[0].style.transform = `translateX(${this.lifeDecrAI}%)`;

			this.lifeBars[1].style.transform = `translateX(${this.lifeDecrPlayer}%)`;

			this.AI.updates();
			this.player.updates();

			// Game end scenario when when one player dies
			if (this.AI.life == 0) {
				this.gameEnd(this.playerWin);
				this.playerScore += 1;
			}
			if (this.player.life == 0) {
				this.gameEnd(this.AIWin);
				this.AIscore += 1;
			}

			// Clock
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
					this.gameEndTimer();
					}	
			}, this.gameRoundTime);
		}

		// Function when game starts. It sets gamePlay to true and starts the timer
		gameStart(bool) {
			this.gamePlay = bool;
			this.gameRoundTime = 121000;
			this.startTime = (new Date()).getTime();
			this.gameRoundTimer();
		}

		// When a game-end state is triggered whether by the game time running out or one of the player wins
		gameEnd(gamestatus) {
			this.gamePlay = false;
			gameWinStatus.innerText = gamestatus;
			gameEndDisp.style.display = 'flex';
			this.questions.questionGenerate = false;
			this.questions.questionText = "";
			this.questions.answerText = "";

			let cheersSound = this.gameSounds.getAudio(this.gameSounds.soundsArray[4]);
			cheersSound.play();

			this.clearTimeOut(this.questions.questionTimer);
			this.clearTimeOut(this.gameRoundTime);
		}

		gameEndTimer() {
				if ((this.AI.life < this.player.life)) {
					this.gameEnd(this.playerWin);
					playerScore += 1;
				}
				else if (this.AI.life > this.player.life) {
					this.gameEnd(this.AIWin);
					AIscore += 1;
				}
				else if(this.AI.life == this.player.life) this.gameEnd("Draw");
		}
	}


	const game = new Game(canvas.width, canvas.height);

	let AIscore = 0;
	let playerScore = 0;

	aIscore.innerText = `${AIscore}`;

	userscore.innerText = `${playerScore}`;

	function animate() {
		if (game.gamePlay) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			game.draw(ctx);
			game.update(ctx);
			game.gamePlaySound.play();
			game.gamePlaySound.loop = true;
		}		

		requestAnimationFrame(animate);
	}

	animate();

	game.windowEvents();
});
