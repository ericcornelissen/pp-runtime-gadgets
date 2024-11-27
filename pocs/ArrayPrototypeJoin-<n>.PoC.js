// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = 2;

export const about = {
	function: "Array.prototype.join",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join",
	properties: ["<n>"],
	description: `
When Array.prototype.join is used, holes in the array are not explicitly handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.join",
	],
	test262: new Set([
		"test/built-ins/Array/prototype/join/S15.4.4.5_A2_T4.js",
		"test/built-ins/Array/prototype/join/S15.4.4.5_A1.2_T1.js",
		"test/built-ins/Array/prototype/join/S15.4.4.5_A1.2_T2.js",
		"test/built-ins/Array/prototype/join/S15.4.4.5_A2_T3.js",
	]),
};

export function prerequisite() {
	const got = original.join();
	if (got === "1,,3") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.join();
	if (got === "1,2,3") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
