// SPDX-License-Identifier: BlueOak-1.0.0

const original = [/* hole */, 2, 3];
const value = 1;

export const about = {
	function: "Array.prototype.reduce",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce",
	properties: ["<n>"],
	description: `
When Array.prototype.reduce is without an initial value, the first value of the
array should be used as initial value. In this case, holes at the start of the
array are not handled and can be polluted to set the initial value.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.reduce",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = original.reduce((a, c) => a + c);
	if (got === 5) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[0] = value;

	const got = original.reduce((a, c) => a + c);
	if (got === 6) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}
