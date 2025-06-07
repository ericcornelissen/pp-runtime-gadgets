// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [3, /* hole */, 2];

export const about = {
	function: "Array.prototype.toSorted",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted",
	properties: ["<n>"],
	description: `
When Array.prototype.toSorted is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-sortindexedproperties",
		"https://tc39.es/ecma262/#sec-array.prototype.tosorted",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/toSorted/holes-not-preserved.js",
		"test/built-ins/Array/prototype/toSorted/length-decreased-while-iterating.js",
	]),
};

export function prerequisite() {
	const got = original.toSorted();
	if (
		got.length === 3
		&&
		got[0] === 2 && got[1] === 3 && got[2] === undefined
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = 1;

	const got = original.toSorted();
	if (
		got.length === 3
		&&
		got[0] === 1 && got[1] === 2 && got[2] === 3
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
