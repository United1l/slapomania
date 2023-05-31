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
			this.AIscore = 0;
			this.playerScore = 0;
			
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
		}

		update() { 
			this.lifeBars[0].style.transform = `translateX(${this.lifeDecrAI}%)`;

			this.lifeBars[1].style.transform = `translateX(${this.lifeDecrPlayer}%)`;

			this.AI.updates(this.playerWin);
			this.player.updates(this.AIWin);

			this.questions.updates();

			// Clock
			this.timeDiff = (new Date()).getTime() - this.startTime;
			clockNumber.innerText = `${Math.floor((this.gameRoundTime/1000) - (this.timeDiff/1000))}`;
		}

		windowEvents() {
			this.questions.outputOperation();
			this.questions.inputOperation();
			this.pauseListener();
		}

		pauseListener() {
			window.addEventListener('keydown', e => {
				if ((e.key == 'Escape' || e.key == ' ')) this.questions.gamePause(e.key);
				let inputSound = this.gameSounds.getAudio(this.gameSounds.soundsArray[2]);
					inputSound.play();
			});
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
			this.questions.answerSlot.value = "";

			let cheersSound = this.gameSounds.getAudio(this.gameSounds.soundsArray[4]);
			cheersSound.play();

			if (this.AI.life == 0) this.playerScore += 1;
			 else if (this.player.life == 0) this.AIscore += 1;

			this.clearTimeOut(this.questions.questionTimer);
			this.clearTimeOut(this.gameRoundTime);
		}

		gameEndTimer() {
				if ((this.AI.life < this.player.life)) {
					this.gameEnd(this.playerWin);
					this.playerScore += 1;
				}
				else if (this.AI.life > this.player.life) {
					this.gameEnd(this.AIWin);
					this.AIscore += 1;
				}
				else if(this.AI.life == this.player.life && this.gameRoundTime == 0) this.gameEnd("Draw");
		}
	}


	const game = new Game(canvas.width, canvas.height);


	function animate() {
		if (game.gamePlay) {
			ctx.clearRect(0, 0, canvas.width, canvas.height)
			game.draw(ctx);
			game.update();
			game.gamePlaySound.play();
			game.gamePlaySound.loop = true;
		}
		aIscore.innerText = `${game.AIscore}`;
		userscore.innerText = `${game.playerScore}`;		

		requestAnimationFrame(animate);
	}

	animate();

	game.windowEvents();

	playAgainBtn.addEventListener('click', () => {
		game.gameStart(true);
		gameEndDisp.style.display = 'none';
		game.questions.questionGenerate = false;
		game.questions.outputOperation();
		game.AI.life = 100;
		game.player.life = 100;
		game.lifeDecrAI = 0;
		game.lifeDecrPlayer = 0;
	});
});
