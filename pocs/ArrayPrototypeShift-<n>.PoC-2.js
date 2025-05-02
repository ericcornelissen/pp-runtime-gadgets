// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 42;

export const about = {
	function: "Array.prototype.shift",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift",
	properties: ["<n>"],
	description: `
When Array.prototype.shift is used, holes in the array are not explicitly
handled when shifting the remaining array. Polluted values will be used to fill
holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.shift",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const array = [...original];
	const _ = array.shift();
	if (
		array.length === 2
		&&
		array[0] === undefined && array[1] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${array}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const array = [...original];
	const _ = array.shift();
	if (
		array.length === 2
		&&
		array[0] === value && array[1] === 3
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
