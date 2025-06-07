// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const length = 10;
const arrayLike = {length};
const value = 42;

export const about = {
	function: "Array.prototype.pop",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop",
	properties: ["<n>"],
	description: `
When Array.prototype.pop is used on an array-like object it does not check if
the element at the last index is an own property and potentially read from the
prototype.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.pop",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/pop/S15.4.4.6_A2_T2.js",
		"test/built-ins/Array/prototype/pop/S15.4.4.6_A2_T3.js",
		"test/built-ins/Array/prototype/pop/clamps-to-integer-limit.js",
	]),
};

export function prerequisite() {
	const got = Array.prototype.pop.call(arrayLike);
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[length-2] = value;

	const got = Array.prototype.pop.call(arrayLike);
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[length-2];
}

export function score() {
	return [
		scoring.MISSING_EXPECTED_KEY,
	];
}
