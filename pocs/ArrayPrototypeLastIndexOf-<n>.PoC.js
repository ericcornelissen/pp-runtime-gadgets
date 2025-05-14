// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.lastIndexOf",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf",
	properties: ["<n>"],
	description: `
When Array.prototype.lastIndexOf is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.lastindexof",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = original.lastIndexOf(value);
	if (got === -1) {
		return [true, null];
	} else {
		return [false, "query already included"];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.lastIndexOf(value);
	if (got === 1) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
