const pauseScreen = document.getElementById('pauseScreen');
const scoreTracker = document.getElementById('scoreTracker');
const displayScore = document.getElementById('displayScore');

const menuItem3 = document.getElementById('menuItem3');
const instructionsBox = document.getElementById('instructionsBox');
const instructionsBoxFS = document.getElementById('instructionsBoxFS');
const closeBtn = document.getElementById('closeBtn');

const easy = document.getElementById('easy');
const hard = document.getElementById('hard');

export class QuestionGenerator {
	constructor(game) {
	this.game = game;	
	this.width = 400;
	this.height = 160;
	this.questionGenerate = false;
	this.questionText = "";
	this.answerText = "";
	this.solution = 0;
	this.keyTracker = false;
	this.questionTimer = "";
	this.questionScope = 200;
	}

	draw(context, x, y) {
		// question box
		context.fillStyle = 'hsl(210, 9%, 31%)';
		context.fillRect(x, y, this.width, this.height);

		let strokePos = y + this.height/2;
		context.strokeStyle = 'hsl(0, 1%, 50%)';
		context.lineWidth = 10;
		context.lineCap = 'round';
		context.beginPath();
		context.moveTo(x, strokePos);
		context.lineTo(x + this.width, strokePos);
		context.stroke();

		// question text output
		this.textOutput(context, this.questionText, x + 60, y, strokePos -22);

		// answer text output
		this.textOutput(context, this.answerText, x + 100, y, strokePos + 58);
	}

	inputOperation() {
		window.addEventListener('keydown', e => {
			this.keyTracker = false;
			if (this.questionGenerate) {
				let key = e.key;
				let keyToNumber = parseInt(key);

				if(!isNaN(keyToNumber) || (key == '-')) this.answerText += key;
				else if (key == 'Backspace') this.answerText = this.answerText.substring(0, this.answerText.length - 1);
				else if (key == 'Escape') this.gamePause(key);
				else console.log('Input is not a number');
			} else if (e.key == 'Escape') this.gamePause(e.key);

			  else this.answerText = "";
		});

		window.addEventListener('keyup', () => {
			this.keyTracker = true;
		});

	}

	outputOperation() {
		this.questionTimer = setTimeout(() => {
			if (this.game.gamePlay) {
				if (this.questionGenerate && (this.answerText.length < eval(this.questionText) || this.answerText == "") && this.answerText != "correct!") {
					this.game.player.life -= 10;
					this.game.player.lifeDrain += 10;
					this.game.AI.slap('AI',this.game.AI.Slap);
				}
				this.updateQuestion(this.questionText);
				this.questionGenerate = true;
				this.answerText = "";
				this.game.player.Slap = false;
				this.game.AI.Slap = false;
			}
			this.outputOperation();
			}, 8000);
	}

	gamePause(key) {
		if (key == 'Escape' && this.game.gamePlay) {
					this.game.gamePlay = false;

					// Game paused and display settings box
					if ((this.game.AI.life != 0) || (this.game.player.life != 0) || (this.game.AI.life == 100) || (this.game.player.life == 100)) {
						this.clearConsoleTimer();

						easy.addEventListener('click', () => {
							this.questionScope = 200;
						});
						hard.addEventListener('click', () => {
							this.questionScope = 400;
						});
					}
					pauseScreen.style.display = 'flex';
					console.log(this.questionScope);

			} else if (key == 'Escape' && !this.game.gamePlay) {
					pauseScreen.style.display = 'none';
					this.game.gamePlay = true;
					this.game.startTime = (new Date()).getTime();
					this.game.gameRoundTimer();
					this.outputOperation();
					this.questionGenerate = true;
			}
	}

	clearConsoleTimer() {
		this.game.clearTimeOut(this.questionTimer);
		this.game.clearTimeOut(this.gameTimer);
		let currentTimeDiff = ((new Date()).getTime()) - this.game.startTime;
		this.game.gameRoundTime -= currentTimeDiff;
		console.log(this.game.gameRoundTime);
		this.questionGenerate = false;
	}

	updateQuestion(prevQuestion) {
		let currentQuestion = this.questionGenerator();
		if (prevQuestion != currentQuestion) {
			this.solution = eval(currentQuestion);
			this.questionText = currentQuestion;
		}
		else currentQuestion = this.questionGenerator();
		
	}

	questionGenerator() {
		let question = null;
		question = `${this.randomNumber()} ${this.randomOperator()} ${this.randomNumber()}`;
		console.log(question);
		return question;
	}

	randomNumber() {
		return Math.floor((Math.random() * this.questionScope) + 1);
	}

	randomOperator() {
		const operators = ['+', '-'];
		let randomOperator = operators[Math.floor(Math.random() * (operators.length))];
		return randomOperator;
	}

	textOutput(context, text, x, y, strokeposition) {
		context.fillStyle = 'hsl(0, 0%, 80%)';
		context.font = '4em sans-serif';
		context.fillText(text, x, strokeposition);

	}
}

scoreTracker.addEventListener('click', () => {
	if (scoreTracker.checked) displayScore.style.display = 'flex';
	else displayScore.style.display = 'none';
});

menuItem3.addEventListener('click', () => {
	instructionsBoxFS.appendChild(instructionsBox);
	instructionsBoxFS.style.display = 'flex';
	pauseScreen.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
	instructionsBoxFS.style.display = 'none';
	pauseScreen.style.display = 'flex';
});