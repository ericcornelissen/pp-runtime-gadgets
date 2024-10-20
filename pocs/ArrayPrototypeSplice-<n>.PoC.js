// SPDX-License-Identifier: BlueOak-1.0.0

const value = 2;

export const about = {
	function: "Array.prototype.splice",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice",
	properties: ["<n>"],
	description: `
When Array.prototype.splice is used, holes in the array are not explicitly
handled and instead it will use polluted values for holes.`,
	test262: new Set([
		"test/built-ins/Array/prototype/splice/create-species-length-exceeding-integer-limit.js",
	]),
};

export function prerequisite() {
	const array = [1, /* hole */, 3];
	array.splice(0, 0);
	if (
		array.length === 3
		&&
		array[0] === 1 && array[1] === undefined && array[2] === 3
	) {
		return [true, null];
	} else {
		return [false, `got ${array}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const array = [1, /* hole */, 3];
	array.splice(0, 0);
	if (
		array.length === 3
		&&
		array[0] === 1 && array[1] === 2 && array[2] === 3
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
