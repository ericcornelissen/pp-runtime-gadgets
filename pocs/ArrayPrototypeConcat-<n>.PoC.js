// SPDX-License-Identifier: BlueOak-1.0.0

const subject = {
	[Symbol.isConcatSpreadable]: true,
	length: 1,
};
const value = 42;

export const about = {
	function: "Array.prototype.concat",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
	properties: ["<n>"],
	description: `
When Array.prototype.concat is used with an Array-like, a faulty implementation
can lead to indexes being looked up in the prototype.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.concat",
	],
};

export function prerequisite() {
	const got = [].concat(subject);
	if (got.length === 1 && got[0] === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[0] = value;

	const got = [].concat(subject);
	if (got.length === 1 && got[0] === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}
