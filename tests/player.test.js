/** * @jest-environment jsdom */

import { Player } from '../components/player.mjs';

const player = new Player();

test('Player object properties', () => {
	expect(player.width).toEqual(250);
	expect(player.height).toEqual(250);
	expect(player.life).toEqual(100);
	expect(player.flip).toBeFalsy();
	expect(player.userHandX).toEqual(674);
	expect(player.xMove).toEqual(50);
	expect(player.recoil).toEqual(-25);
	expect(player.gravity).toEqual(2.5);
	expect(player.Slap).toBeFalsy();
});