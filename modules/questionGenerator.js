export class QuestionGenerator {
	constructor(game) {
	this.game = game;	
	this.width = 400;
	this.height = 160;
	this.questionGenerate = false;
	this.questionText = "";
	this.answerText = "";
	this.keyTracker = false;
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
		context.lineTo(x+this.width, strokePos);
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

				if(!isNaN(keyToNumber)) this.answerText += keyToNumber;
				else if (key == 'Backspace') this.answerText = this.answerText.substring(0, this.answerText.length - 1);
				else console.log('Input is not a number');
				} else this.answerText = "";
		});

		window.addEventListener('keyup', () => {
			this.keyTracker = true;
		});

	}

	outputOperation() {
		setTimeout(() => {
			this.questionGenerate = true;
			this.updateQuestion(this.questionText);
			this.clearConsole();
			this.outputOperation();
		}, 10000);
	}

	clearConsole() {
		setTimeout(() => {
			if (this.game.playerCorrect != undefined) this.answerText = "";
			else if (this.game.playerCorrect == undefined && this.answerText.length >= (1 || 2 || 3)) this.answerText = "";
			this.clearConsole();
		},4000);
	}

	updateQuestion(prevQuestion) {
		let currentQuestion = this.questionGenerator();
		if (prevQuestion != currentQuestion) this.questionText = currentQuestion;
		else currentQuestion = this.questionGenerator();
		
	}

	questionGenerator() {
		let question = null;
		question = `${this.randomNumber()} + ${this.randomNumber()}`;
		console.log(question);
		return question;
	}

	randomNumber() {
		return Math.floor((Math.random() * 200) + 1);
	}

	textOutput(context, text, x, y, strokeposition) {
		context.fillStyle = 'hsl(0, 0%, 80%)';
		context.font = '4em sans-serif';
		context.fillText(text, x, strokeposition);

	}
}