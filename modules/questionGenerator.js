export class QuestionGenerator {
	constructor() {
	this.width = 400;
	this.height = 160;
	this.questionText = "";
	this.answerText = "";
	}

	draw(context, x, y){
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

	inputOperation(){
		window.addEventListener('keydown', e => {
			let key = e.key;
			console.log(key);
			let keyToNumber = parseInt(key);

			if(!isNaN(keyToNumber)) this.answerText += keyToNumber;
			else if (key.toString() == 'Backspace') this.answerText.slice(0, this.answerText.length -1);
			else console.log('Input is not a number');
		});

	}

	outputOperation(){
		setTimeout(() => {
			this.updateQuestion(this.questionText);
			this.outputOperation();
		}, 10000);
	}

	updateQuestion(prevQuestion){
		let currentQuestion = this.questionGenerator();
		if (prevQuestion != currentQuestion) this.questionText = currentQuestion;
		else currentQuestion = this.questionGenerator();
		
	}

	questionGenerator(){
		let question = null;
		question = `${this.randomNumber()} + ${this.randomNumber()}`;
		console.log(question);
		return question;
	}

	randomNumber(){
		return Math.floor((Math.random() * 200) + 1);
	}

	textOutput(context, text, x, y, strokeposition){
		context.fillStyle = 'hsl(0, 0%, 80%)';
		context.font = '4em sans-serif';
		context.fillText(text, x, strokeposition);

	}
}