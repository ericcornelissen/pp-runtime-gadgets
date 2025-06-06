// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.with",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with",
	properties: ["<n>"],
	description: `
When Array.prototype.with is used, holes in the array are not explicitly
preserved and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.with",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/with/length-decreased-while-iterating.js",
		"test/built-ins/Array/prototype/with/holes-not-preserved.js",
	]),
};

export function prerequisite() {
	const got = original.with(2, 42);
	if (
		got.length === 3
		&&
		got[0] === 1 && got[1] === undefined && got[2] === 42
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.with(2, 42);
	if (
		got.length === 3
		&&
		got[0] === 1 && got[1] === 2 && got[2] === 42
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
