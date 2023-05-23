export class Player {
	constructor(game, x, y, flip) {
		this.game = game;
		this.playerImage = document.getElementById('playerDefault');
		this.playerSlappedImage = document.getElementById('playerSlapped');
		this.handImage = document.getElementById('handMove');
		this.handImageSlap = document.getElementById('handSlap');  
		this.width = 90;
		this.height = 90;
		this.life = 100;
		this.lifeDrain = 0.1;
		this.flip = flip;
		this.x = x;
		this.y = y;
		this.handX = x + 50;
		this.handY = y + 50;
		this.slapPower = 0;
		this.recoil = -20
	}

	// Draw function to draw player on to the canvas
	draw(context) {
		this.mirrorImage(context, this.playerImage, this.x, this.y, this.width, this.height, this.flip);

		// Hands
		if (this.handX <= 100) this.mirrorImage(context, this.handImage, this.handX, this.handY, 100, 90, this.flip);
		else this.mirrorImage(context, this.handImage, this.handX -100, this.handY, 100, 90, this.flip);
	}

	mirrorImage(context, image, x = 0, y = 0, w = 0, h = 0, flipHorizontal = false) {
		context.save();
		context.setTransform(flipHorizontal? -1: 1, 0, 0, 1, 
			x + (flipHorizontal? image.width: 0), y); 
		context.drawImage(image, x, y, w, h);
		context.restore();
	}

	getImage(src) {
		let image = new Image();
		image.src = src;
		return image;
	}

	updateLifeBars(lifebar, direction) {
			let playerLifeBar = lifebar;
			playerLifeBar.style.background = `linear-gradient(${direction}, darkorange ${this.life - 0.1}%, black ${this.lifeDrain}%)`;
	}	

	slap() {
		setInterval(() => {
			this.handX += this.slapPower;
			if (this.handX < 115) this.slapPower = 100;
			else if (!this.initialPos()) this.slapPower += this.recoil;
			else this.slapPower = 0;
		}, 5000);
	}

	initialPos() {
		return this.handX <= 114;
	}

	update(lifebar, direction) {
		this.updateLifeBars(lifebar, direction);
	} 
}