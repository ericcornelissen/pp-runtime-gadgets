// SPDX-License-Identifier: BlueOak-1.0.0

const length = 10;
const arrayLike = {length};
const value = 42;

export const about = {
	function: "Array.prototype.shift",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
	properties: ["<n>"],
	description: `
When Array.prototype.shift is used on an array-like object it does not check if
the element at the first index is an own property and potentially reads from the
prototype.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.shift",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/shift/S15.4.4.9_A2_T3.js",
		"test/built-ins/Array/prototype/shift/S15.4.4.9_A2_T4.js",
	]),
};

export function prerequisite() {
	const got = Array.prototype.shift.call(arrayLike);
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[0] = value;

	const got = Array.prototype.shift.call(arrayLike);
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}
