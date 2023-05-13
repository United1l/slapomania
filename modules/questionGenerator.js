export class QuestionGenerator {
	constructor() {
	this.width = 400;
	this.height = 160;
	this.questionText = "";
	this.answerText = "wrong!"
	}

	draw(context, x, y){
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
		context.fillStyle = 'hsl(0, 0%, 80%)';
		context.font = '4em sans-serif';
		context.fillText(this.questionText, x + 60, strokePos - 22);

		// answer text output
		context.fillStyle = 'hsl(0, 0%, 80%)';
		context.font = '4em sans-serif';
		context.fillText(this.answerText, x + 100, strokePos + 58);
	}

	outputOperation(){
		this.updateQuestion(this.questionText);
	}

	updateQuestion(prevQuestion){
		let currentQuestion = this.questionGenerator();
		if (prevQuestion != currentQuestion) this.questionText = currentQuestion;
		else currentQuestion = this.questionGenerator();
		
	}

	questionGenerator(){
		let question = `${this.randomNumber()} + ${this.randomNumber()}`;
		console.log(question);
		return question;
	}

	randomNumber(){
		return Math.floor((Math.random() * 1000) + 1);
	}
}