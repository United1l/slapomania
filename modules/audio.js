export class GameAudio {
	constructor() {
		this.soundsArray = ['./assets/sounds/gameMusic.mp3', './assets/sounds/questionGenerate.wav','./assets/sounds/userInput.wav', './assets/sounds/slap.wav',
			'./assets/sounds/cheers.mp3'
			];
	}

	getAudio(src) {
		var source = new Audio();
		source.src = src;
		return source;
	}

}