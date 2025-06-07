// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [null];
const value = 2;

export const about = {
	function: "Array.prototype.flatMap",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap",
	properties: ["<n>"],
	description: `
When Array.prototype.flatMap is used, holes in mapped arrays are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-flattenintoarray",
		"https://tc39.es/ecma262/#sec-array.prototype.flatmap",
	],
};

export function prerequisite() {
	const got = original.flatMap(_ => [1, /* hole */, 3]);
	if (
		got.length === 2
		&&
		got[0] === 1 && got[1] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.flatMap(_ => [1, /* hole */, 3]);
	if (
		got.length === 3
		&&
		got[0] === 1 && got[1] === value && got[2] === 3
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
