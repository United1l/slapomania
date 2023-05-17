export class Player {
	constructor(game, x, y){
		this.game = game;
		this.width = 100;
		this.height = 100;
		this.x = x;
		this.y = y;
		this.handX = x;
		this.handY = y;
		this.slapPower = 0;
		this.recoil = -20
	}

	// Draw function to draw player on to the canvas
	draw(context){
		context.fillStyle = 'red';
		context.beginPath();
		context.arc(this.x, this.y, this.width, 0, Math.PI * 2, false);
		context.fill();

		// Hands
		context.fillStyle = 'purple';
		if (this.handX > 115) {
			context.fillRect(this.handX - 350, this.handY - 20, 200, 90);
		} else {
			context.fillRect(this.handX + 150, this.handY - 20, 200, 90);
		}

	}

	// Life bar function that displays a player's life bar and its various properties
	lifeBar(context, x, y, w, h, gradientDirection){
		let lifeValue = 100;
		context.fillStyle = 'blue';
		context.fillRect(x, y, w, h);
	}

	slap(){
		setInterval(() => {
			this.handX += this.slapPower;
			if (this.handX < 115) this.slapPower = 100;
			else if (!this.initialPos()) this.slapPower += this.recoil;
			else this.slapPower = 0;
		}, 5000);
	}

	initialPos(){
		return this.handX <= 114;
	} 
}