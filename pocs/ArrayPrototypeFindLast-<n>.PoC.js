// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.findLast",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast",
	properties: ["<n>"],
	description: `
When Array.prototype.findLast is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	test262: new Set([
		"test/built-ins/Array/prototype/findLast/maximum-index.js",
	]),
};

export function prerequisite() {
	const got = original.findLast(entry => entry === value);
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.findLast(entry => entry === value);
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}