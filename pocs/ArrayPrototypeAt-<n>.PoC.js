// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 2];
const value = 42;

export const about = {
	function: "Array.prototype.at",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/at",
	properties: ["<n>"],
	description: `
When Array.prototype.at is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	test262: new Set([
		"test/built-ins/Array/prototype/at/returns-undefined-for-holes-in-sparse-arrays.js",
		"test/built-ins/Array/prototype/at/returns-item-relative-index.js",
		"test/built-ins/Array/prototype/at/returns-item.js",
	]),
};

export function prerequisite() {
	const got = original.at(1);
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.at(1);
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
