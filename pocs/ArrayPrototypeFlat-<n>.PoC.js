// SPDX-License-Identifier: BlueOak-1.0.0

const original = [[1, /* hole */, 3]];
const value = 2;

export const about = {
	function: "Array.prototype.flat",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat",
	properties: ["<n>"],
	description: `
When Array.prototype.flat is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-flattenintoarray",
		"https://tc39.es/ecma262/#sec-array.prototype.flat",
	],
};

export function prerequisite() {
	const got = original.flat();
	if (
		got.length === 2
		&&
		got[0] === 1 && got[1] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.flat();
	if (
		got.length === 3
		&&
		got[0] === 1 && got[1] === value && got[2] === 3
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
