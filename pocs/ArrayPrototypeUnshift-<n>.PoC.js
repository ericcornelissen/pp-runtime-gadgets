// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 42;

export const about = {
	function: "Array.prototype.shift",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift",
	properties: ["<n>"],
	description: `
When Array.prototype.unshift is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.unshift",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const array = [...original];
	const _ = array.unshift(0);
	if (
		array.length === 4
		&&
		array[0] === 0
		&&
		array[1] === 1
		&&
		array[2] === undefined
		&&
		array[3] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const array = [...original];
	const _ = array.unshift(0);
	if (
		array.length === 4
		&&
		array[0] === 0
		&&
		array[1] === 1
		&&
		array[2] === value
		&&
		array[3] === 3
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
