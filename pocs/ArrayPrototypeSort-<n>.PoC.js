// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

export const about = {
	function: "Array.prototype.sort",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort",
	properties: ["<n>"],
	description: `
When Array.prototype.sort is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-sortindexedproperties",
		"https://tc39.es/ecma262/#sec-array.prototype.sort",
	],
	test262: new Set([
		"test/built-ins/TypedArray/prototype/sort/stability.js",
		"test/built-ins/Array/prototype/sort/precise-getter-pops-elements.js",
	]),
};

export function prerequisite() {
	const array = [3, /* hole */, 2];
	array.sort();
	if (
		array.length === 3
		&&
		array[0] === 2 && array[1] === 3 && array[2] === undefined
	) {
		return [true, null];
	} else {
		return [false, `got ${array}`];
	}
}

export function test() {
	Object.prototype[1] = 1;

	const array = [3, /* hole */, 2];
	array.sort();
	if (
		array.length === 3
		&&
		array[0] === 1 && array[1] === 2 && array[2] === 3
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
