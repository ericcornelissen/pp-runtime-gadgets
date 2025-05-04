// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 2];
const value = 42;

export const about = {
	function: "Array.prototype.copyWithin",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin",
	properties: ["<n>"],
	description: `
When Array.prototype.copyWithin is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.copywithin",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/copyWithin/coerced-values-start-change-target.js",
		"test/built-ins/Array/prototype/copyWithin/coerced-values-start-change-start.js",
	]),
};

export function prerequisite() {
	const got = original.copyWithin(0, 1, 2);
	if (
		got.length === 3
		&&
		got[0] === undefined && got[1] === undefined && got[2] === 2
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.copyWithin(0, 1, 2);
	if (
		got.length === 3
		&&
		got[0] === value && got[1] === 42 && got[2] === 2
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
