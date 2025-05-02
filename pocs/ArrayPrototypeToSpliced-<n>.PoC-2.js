// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 4];
const value = 3;

export const about = {
	function: "Array.prototype.toSpliced",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced",
	properties: ["<n>"],
	description: `
When Array.prototype.toSpliced is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes when shifting values
after the inserted index.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.tospliced",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = original.toSpliced(1, 0, 2);
	if (
		got.length === 4
		&&
		got[0] === 1
		&&
		got[1] === 2
		&&
		got[2] === undefined
		&&
		got[3] === 4
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.toSpliced(1, 0, 2);
	if (
		got.length === 4
		&&
		got[0] === 1
		&&
		got[1] === 2
		&&
		got[2] === 3
		&&
		got[3] === 4
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
