// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.every",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every",
	properties: ["<n>"],
	description: `
When Array.prototype.every is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.every",
	],
	test262: new Set([
		"/test/built-ins/Array/prototype/every/15.4.4.16-7-c-ii-5.js",
	]),
};

export function prerequisite() {
	const got = original.every(entry => entry !== value);
	if (got === true) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.every(entry => entry !== value);
	if (got === false) {
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
