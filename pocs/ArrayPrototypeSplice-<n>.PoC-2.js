// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.splice",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
	properties: ["<n>"],
	description: `
When Array.prototype.splice is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes in the returned
array.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.splice",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const array = [...original];
	const got = array.splice(1, 2);
	if (
		got.length === 2
		&&
		got[0] === undefined && got[1] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${array}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const array = [...original];
	const got = array.splice(1, 2);
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
