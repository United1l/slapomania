export class PlayerInput {
	constructor(){
		
	}

	keyDown(){
		window.addEventListener('keydown', e => {
		console.log(e.key);
})
	}
}