// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const set1 = new Set([1, 2]);
const set2 = [3];

export const about = {
	function: "Set.prototype.union",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/union",
	properties: ["'has'", "'size'"],
	description: `
To get the union of two sets the function first checks the 'size' of the Set (or
rather any object) and it will then check if the provided Set 'has' the element
of the 'this' Set. By polluting the 'size' to be greater than the array length
and 'has' to always return false, all objects from the non-set object will be
added to the first set.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-set.prototype.union",
		"https://tc39.es/ecma262/#sec-getsetrecord",
	],
	test262: new Set([
		"test/built-ins/Set/prototype/union/array-throws.js",
	]),
};

export function prerequisite() {
	try {
		set1.union(set2);
		return [false, "Unexpected success"];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype.has = () => false;
	Object.prototype.size = 100;

	const set3 = set1.union(set2);
	if (
		set3.size === 3
		&&
		set3.has(1)
		&&
		set3.has(2)
		&&
		set3.has(0)
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.size;
	delete Object.prototype.has;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
