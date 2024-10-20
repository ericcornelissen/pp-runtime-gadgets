// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.reduce",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
	properties: ["<n>"],
	description: `
When Array.prototype.reduce is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	test262: new Set([
		"test/built-ins/Array/prototype/reduce/15.4.4.21-9-c-ii-5.js",
	]),
};

export function prerequisite() {
	const got = original.reduce((a, c) => a + c);
	if (got === 4) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.reduce((a, c) => a + c);
	if (got === 6) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
