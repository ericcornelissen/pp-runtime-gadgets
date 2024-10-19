/*
Explanation:
When an ArrayBuffer is constructed it optionally accepts a maximum length (in
bytes). If not explicitly set on the `options` object, it may read from the
prototype chain.

test262:
- test/built-ins/Array/from/source-object-length-set-elem-prop-err.js
*/

const value = "foobar";
const arrayLike = {
	length: 1,
};

export const about = {
	function: "Array.from",
	properties: ["<n>"],
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
