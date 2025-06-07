// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 42;

export const about = {
	function: "Array.prototype.slice",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice",
	properties: ["<n>"],
	description: `
When Array.prototype.slice is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.slice",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = original.slice(1, 3);
	if (
		got.length === 2
		&&
		got[0] === undefined && got[1] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.slice(1, 3);
	if (
		got.length === 2
		&&
		got[0] === value && got[1] === 3
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
