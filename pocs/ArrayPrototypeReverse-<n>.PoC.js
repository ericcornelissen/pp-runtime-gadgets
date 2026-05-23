// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3, 4];
const value = 2;

export const about = {
	function: "Array.prototype.reverse",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse",
	properties: ["<n>"],
	description: `
When Array.prototype.reverse is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.reverse",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = [...original].reverse();
	if (
		got.length === 4
		&&
		got[0] === 4 && got[1] === 3 && got[2] === undefined && got[3] === 1
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = [...original].reverse();
	if (
		got.length === 4
		&&
		got[0] === 4 && got[1] === 3 && got[2] === value && got[3] === 1
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}

export function score() {
	return [
		scoring.MISSING_EXPECTED_KEY,
	];
}
