// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const value = 1;

export const about = {
	function: "Array.prototype.fill",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill",
	properties: ["<n>"],
	description: `
When Array.prototype.fill is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
	],
	test262: new Set([
		"test/built-ins/Array/prototype/fill/fill-values-custom-start-and-end.js",
	]),
};

export function prerequisite() {
	const array = [/* hole */, 2, 3];
	array.fill(42, 1, 3);
	if (
		array.length === 3
		&&
		array[0] === undefined && array[1] === 42 && array[2] === 42
	) {
		return [true, null];
	} else {
		return [false, `got ${array}`];
	}
}

export function test() {
	Object.prototype[0] = value;

	const array = [/* hole */, 2, 3];
	array.fill(42, 1, 3);
	if (
		array.length === 3
		&&
		array[0] === value && array[1] === 42 && array[2] === 42
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}

export function score() {
	return [
		scoring.MISSING_EXPECTED_KEY,
	];
}
