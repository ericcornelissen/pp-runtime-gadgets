// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.findIndex",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex",
	properties: ["<n>"],
	description: `
When Array.prototype.findIndex is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	test262: new Set([
		"test/built-ins/Array/prototype/findIndex/predicate-called-for-each-array-property.js",
	]),
};

export function prerequisite() {
	const got = original.findIndex(entry => entry === value);
	if (got === -1) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.findIndex(entry => entry === value);
	if (got === 1) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
