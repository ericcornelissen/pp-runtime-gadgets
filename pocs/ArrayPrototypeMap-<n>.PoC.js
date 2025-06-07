// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const original = [1, /* hole */, 3];
const fn = x => x*2;

export const about = {
	function: "Array.prototype.map",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map",
	properties: ["<n>"],
	description: `
When Array.prototype.map is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.map",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = original.map(fn);
	if (
		got.length === 3
		&&
		got[0] === 2 && got[1] === undefined && got[2] === 6
	) {
		return [true, null];
	} else {
		return [false, "query already included"];
	}
}

export function test() {
	Object.prototype[1] = 2;

	const got = original.map(fn);
	if (
		got.length === 3
		&&
		got[0] === 2 && got[1] === 4 && got[2] === 6
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
