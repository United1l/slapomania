import { QuestionGenerator } from '../modules/questionGenerator.js';

const { default: testRunner} = require("jest-runner");
const questionGen = new QuestionGenerator('Yah');

const inputOperation = questionGen.inputOperation();

test('inputOperation for the game', () => {
	expect(inputOperation()).toBe(() => {
		if (window.onKeyDown == 'Backspace') {
			questionGen.answerText.substring(0, questionGen.answerText.length - 1);
		}
	});
});