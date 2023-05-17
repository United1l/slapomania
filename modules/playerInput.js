export class PlayerInput {
	constructor(){
		this.inputArray = [];	
	}

	keyDown(){
		window.addEventListener('keydown', e => {
			if (typeof(e.key) == 'number') this.inputArray.push(e.key);
		})			
		console.log(this.inputArray);
	}
}