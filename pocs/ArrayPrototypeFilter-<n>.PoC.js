// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.filter",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter",
	properties: ["<n>"],
	description: `
When Array.prototype.filter is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.filter",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/filter/15.4.4.20-9-c-ii-5.js",
		"test/built-ins/Array/prototype/filter/15.4.4.20-9-c-iii-1-6.js",
	]),
};

export function prerequisite() {
	const got = original.filter(entry => entry === value);
	if (got.length === 0) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.filter(entry => entry === value);
	if (got.length === 1 && got[0] === value) {
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
