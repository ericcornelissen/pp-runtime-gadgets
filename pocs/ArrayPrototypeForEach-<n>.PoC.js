// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.forEach",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach",
	properties: ["<n>"],
	description: `
When Array.prototype.forEach is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.foreach",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/forEach/15.4.4.18-7-c-ii-5.js",
		"test/built-ins/Array/prototype/findLast/predicate-called-for-each-array-property.js",
	]),
};

export function prerequisite() {
	const got = [];
	original.forEach(entry => got.push(entry));
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

	const got = [];
	original.forEach(entry => got.push(entry));
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
