// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.some",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some",
	properties: ["<n>"],
	description: `
When Array.prototype.some is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.some",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/some/15.4.4.17-7-c-ii-5.js",
	]),
};

export function prerequisite() {
	const got = original.some(entry => entry === value);
	if (got === false) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.some(entry => entry === value);
	if (got === true) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
