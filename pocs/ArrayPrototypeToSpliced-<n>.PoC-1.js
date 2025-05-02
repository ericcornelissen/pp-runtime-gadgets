// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.toSpliced",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced",
	properties: ["<n>"],
	description: `
When Array.prototype.toSpliced is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes in the original
array.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.tospliced",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/toSpliced/length-decreased-while-iterating.js",
		"test/built-ins/Array/prototype/toSpliced/holes-not-preserved.js",
	]),
};

export function prerequisite() {
	const got = original.toSpliced(0, 0);
	if (
		got.length === 3
		&&
		got[0] === 1 && got[1] === undefined && got[2] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.toSpliced(0, 0);
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
