// SPDX-License-Identifier: BlueOak-1.0.0

// NOTE: This test uses Int16Array as a concrete implementation of TypedArray.

const value = 42;
const arrayLike = {
	length: 1,
};

export const about = {
	function: "TypedArray.from",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from",
	properties: ["<n>"],
	description: `
When TypedArray.from is given an array-like object it assumes the length is
correct and all indices from 0 to length are present. If this is not the case a
polluted index will be used.`,
	test262: new Set([
		"test/built-ins/TypedArrayConstructors/from/custom-ctor-returns-other-instance.js",
	]),
};

export function prerequisite() {
	const got = Int16Array.from(arrayLike);
	if (got.length === 1 && got[0] === 0) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[0] = value;

	const got = Int16Array.from(arrayLike);
	if (got.length === 1 && got[0] === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}
