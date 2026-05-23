// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.toReversed",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed",
	properties: ["<n>"],
	description: `
When Array.prototype.toReversed is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.toreversed",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/toReversed/holes-not-preserved.js",
		"test/built-ins/Array/prototype/toReversed/length-decreased-while-iterating.js",
	]),
};

export function prerequisite() {
	const got = original.toReversed();
	if (
		got.length === 3
		&&
		got[0] === 3 && got[1] === undefined && got[2] === 1
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.toReversed();
	if (
		got.length === 3
		&&
		got[0] === 3 && got[1] === 2 && got[2] === 1
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
