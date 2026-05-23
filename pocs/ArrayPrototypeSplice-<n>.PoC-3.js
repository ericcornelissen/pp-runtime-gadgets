// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 4];
const value = 3;

export const about = {
	function: "Array.prototype.splice",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
	properties: ["<n>"],
	description: `
When Array.prototype.splice is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes when shifting values
after the inserted index.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.splice",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const array = [...original];
	array.splice(1, 0, 2);
	if (
		array.length === 4
		&&
		array[0] === 1
		&&
		array[1] === 2
		&&
		array[2] === undefined
		&&
		array[3] === 4
	) {
		return [true, null];
	} else {
		return [false, `got ${array}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const array = [...original];
	array.splice(1, 0, 2);
	if (
		array.length === 4
		&&
		array[0] === 1
		&&
		array[1] === 2
		&&
		array[2] === 3
		&&
		array[3] === 4
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
