// SPDX-License-Identifier: BlueOak-1.0.0

const value = "foobar";
const arrayLike = {
	length: 1,
};

export const about = {
	function: "Array.from",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from",
	properties: ["<n>"],
	description: `
When Array.from is given an array-like object it assumes the length is correct
and all indices from 0 to length are present. If this is not the case a polluted
index will be used.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.from",
	],
	test262: new Set([
		"test/built-ins/Array/from/Array.from_forwards-length-for-array-likes.js",
		"test/built-ins/Array/from/array-like-has-length-but-no-indexes-with-values.js",
		"test/built-ins/Array/from/source-object-length-set-elem-prop-err.js",
	]),
};

export function prerequisite() {
	const got = Array.from(arrayLike);
	if (got.length === 1 && got[0] === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[0] = value;

	const got = Array.from(arrayLike);
	if (got.length === 1 && got[0] === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}
