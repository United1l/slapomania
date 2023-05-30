/** * @jest-environment jsdom */

import { GameAudio } from '../components/audio.mjs';

test('getAudio', () => {
		const audio = new GameAudio();
		const src = 'http://localhost/loc/somesrc.wav';

		const sound = audio.getAudio(src);

		expect(sound.src).toEqual(src);
});