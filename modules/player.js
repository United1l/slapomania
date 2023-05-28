export class Player {
	constructor(game, x, y, flip) {
		this.game = game;
		this.playerImage = document.getElementById('playerDefault');
		this.handImage = document.getElementById('handMove'); 
		this.width = 250;
		this.height = 250;
		this.life = 100;
		this.lifeDrain = 0.1;
		this.flip = false;
		this.x = x;
		this.y = y;
		this.handX = x;
		this.handY = y;
		this.handW = 100;
		this.handH = 90;

		this.userHandX = 674;
		this.userHandY = this.handY + 205;
		this.AIhandX = 250;
		this.AIhandY = this.handY + 150;
		this.xAdderUser = 0;
		this.yAdderUser = 0;
		this.xAdderAI = 0;
		this.yAdderAI = 0;

		this.xMove = 50;
		this.recoil = -25;

		this.gravity = 2.5;
		this.velocityUp = 0;

		this.userSlap = false;
		this.AIslap = false;
		this.Slap = false;
	}

	// Draw function to draw player on to the canvas
	draw(context, playerHead, playerHand, handW, handH, flip) {
		if (this.x > 250) this.mirrorImage(context, playerHead, this.x, this.y - 4, this.width, this.height, (flip = true));
		else this.mirrorImage(context, playerHead, this.x, this.y, this.width, this.height, (flip = false));

		// Hands
		if (this.x <= 250) this.mirrorImage(context, playerHand, this.AIhandX, this.AIhandY + 40, handW, handH, (flip = true));
		else this.mirrorImage(context, playerHand, this.userHandX, this.userHandY - 12, handW, handH, (flip = false));
	}

	mirrorImage(context, image, x = 0, y = 0, w = 0, h = 0, flipHorizontal = false) {
		if (flipHorizontal) {
			context.save();
			context.setTransform(-1, 0, 0, 1, (x +  w), 0);
			context.drawImage(image, 0, y, w, h);
			context.restore();
		} else {
			context.drawImage(image, x, y, w, h);
		}
	}

	updateLifeBars(lifebar, direction) {
			let playerLifeBar = lifebar;
			playerLifeBar.style.background = `linear-gradient(${direction}, darkorange ${this.life - 0.1}%, black ${this.lifeDrain}%)`;
	}	

	slap(ID, slap) {
		if (ID == 'player' && !slap) this.userSlap = true;
		else if (ID == 'AI' && !slap) this.AIslap = true;
	}

	reset() {
		this.width = 250;
	}

	updates(lifebar, direction) {
		this.updateLifeBars(lifebar, direction);
		this.game.player.y -= this.velocityUp;

		if (this.game.player.y < this.game.height/8) this.velocityUp = -this.gravity;
		else this.game.player.y = (this.game.height/8) + 6;

		this.userHandX += this.xAdderUser;
		this.userHandY += this.yAdderUser;
		
		this.AIhandX += this.xAdderAI;
		this.AIhandY += this.yAdderAI;

		// On slap add motion effects: player
		if (this.userSlap) {
			this.xAdderUser = -this.xMove;

			if (this.userHandX < this.game.width/2) {
				this.yAdderUser = -10;
				}

			// When user hand has slapped AI(near AI.x location)	
			if (this.userHandX < 150) {
				this.game.AI.width = 100;
				this.userSlap = false;
				this.Slap = true;

				let slapSound = this.game.gameSounds.getAudio(this.game.gameSounds.soundsArray[4]);
				slapSound.play();
			}	
		} 

		// On slap add motion effects: AI
		else if (this.AIslap) {
			this.xAdderAI = this.xMove;

			 if (this.AIhandX > this.game.width/2) {
				this.yAdderAI = -15;
			 }

			 // When AI hand has slapped user(near player.x location)
			 if (this.AIhandX > 714) {
				this.AIslap = false
				this.Slap = true;
				this.game.player.velocityUp = 50;

				let slapSound = this.game.gameSounds.getAudio(this.game.gameSounds.soundsArray[4]);
				slapSound.play();
			}

		} 

		// User rafter slap return animation
		if (this.userHandX <= 150) {
			this.xAdderUser = -this.recoil;
		} 

		// Bring element to default positions if they escape bounds
	 	else if (this.userHandX >= 674 && !this.userSlap) {
	 		this.xAdderUser = 0;
	 		this.game.player.yAdderUser = 0;
		}

//		if (this.AIhandX == 715 && this.AIhandX > 250) {
//		}

		// AI after slap return animation
		if (this.AIhandX >= 714) {
			this.xAdderAI = this.recoil;
		} 
		else if (this.AIhandX <= 250 && !this.AIslap) {
			this.xAdderAI = 0;
			this.game.AI.yAdderAI = 0;
			this.reset();
		}
	} 
}