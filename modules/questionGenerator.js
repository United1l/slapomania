export class QuestionGenerator {
	constructor() {
	this.width = 400;
	this.height = 160;
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
	}

	outputOperation(context){
		//context.text = '';
		//setInterval(,2000)
	}
}