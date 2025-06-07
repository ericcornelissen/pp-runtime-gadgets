// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.find",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find",
	properties: ["<n>"],
	description: `
When Array.prototype.find is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-findviapredicate",
		"https://tc39.es/ecma262/#sec-array.prototype.find",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/find/predicate-called-for-each-array-property.js",
	]),
};

export function prerequisite() {
	const got = original.find(entry => entry === value);
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.find(entry => entry === value);
	if (got === value) {
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
