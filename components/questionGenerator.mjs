const pauseScreen = document.getElementById('pauseScreen');
const scoreTracker = document.getElementById('scoreTracker');
const displayScore = document.getElementById('displayScore');

const menuItem3 = document.getElementById('menuItem3');
const instructionsBox = document.getElementById('instructionsBox');
const instructionsBoxFS = document.getElementById('instructionsBoxFS');
const closeBtn = document.getElementById('closeBtn');

const questionSlot = document.getElementById('questionSlot');
const answerSlot = document.getElementById('answerSlot');


export class QuestionGenerator {
	constructor(game) {
	this.game = game;
	this.questionGenerate = false;
	this.questionText = "";
	this.answerSlot = answerSlot;
	this.answerText = answerSlot.value;
	this.solution = 0;
	this.keyTracker = false;
	this.questionTimer = "";
	this.ten = 10;
	}

	updates() {
		// Question evaluation
			if (this.keyTracker && this.questionGenerate == true) {
				if (this.answerSlot.value != "" && this.answerText.toString().length == this.solution.toString().length && this.answerText == this.solution) {
					answerSlot.style.border = '2px solid green';
					this.game.AI.life -= this.ten;
					this.game.lifeDecrAI -= this.ten;
					
					this.game.player.slap('player', this.game.player.Slap);
					this.questionGenerate = false;
				} 
				else if (this.answerSlot.value != "" && this.answerText.toString().length == this.solution.toString().length && this.answerText != this.solution) {
					answerSlot.style.border = '2px solid red';
					this.game.player.life -= this.ten;
					this.game.lifeDecrPlayer += this.ten;

					this.game.AI.slap('AI', this.game.AI.Slap);
					this.questionGenerate = false;
				} 
				else if (this.answerText != "" && this.answerText.toString().length < this.solution.toString().length) this.answerText = answerSlot.value;
			
			console.log(this.answerText);
		}
	}

	inputOperation() {
		window.addEventListener('keydown', () => {
			answerSlot.focus();
			if (this.questionGenerate && answerSlot.value <= 1000)
				this.keyTracker = false;
				this.answerText = this.answerSlot.value;	
			});

		window.addEventListener('keyup', () => {
			this.keyTracker = true;
			answerSlot.blur();
		});
	}

	outputOperation() {
		this.questionTimer = setTimeout(() => {
			if (this.game.gamePlay) {
				if (this.questionGenerate && (this.answerSlot.value == "" || this.answerText.toString().length <= this.solution.toString().length) && this.answerText != this.solution) {
					this.game.AI.slap('AI',this.game.AI.Slap);
					this.game.player.life -= this.ten;
					this.game.lifeDecrPlayer += this.ten;		
				}
				answerSlot.style.border = '2px solid white';
				this.updateQuestion(this.questionText);
				questionSlot.innerText = this.questionText;

				let questionSound = this.game.gameSounds.getAudio(this.game.gameSounds.soundsArray[2]);
				questionSound.play();

				this.questionGenerate = true;
				answerSlot.value = "";
				this.game.player.Slap = false;
				this.game.AI.Slap = false;
			}
			this.outputOperation();
			}, 8000);
	}

	gamePause(key) {
		if ((key == 'Escape' || key == ' ') && this.game.gamePlay) {
					this.game.gamePlay = false;

					// Game paused and display settings box
					if ((this.game.AI.life != 0 || this.game.player.life != 0) || (this.game.AI.life == 100 || this.game.player.life == 100)) {
						this.clearConsoleTimer();
					}
					pauseScreen.style.display = 'flex';
					this.game.gamePlaySound.pause();

			} else if ((key == 'Escape' || key == ' ') && !this.game.gamePlay) {
					pauseScreen.style.display = 'none';
					instructionsBoxFS.style.display = 'none';
					this.game.gamePlaySound.play();

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
		return Math.floor((Math.random() * 360) + 1);
	}

	randomOperator() {
		const operators = ['+', '-'];
		let randomOperator = operators[Math.floor(Math.random() * (operators.length))];
		return randomOperator;
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