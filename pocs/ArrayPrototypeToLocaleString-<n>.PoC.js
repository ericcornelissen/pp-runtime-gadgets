// SPDX-License-Identifier: BlueOak-1.0.0

const original = [1, /* hole */, 3];
const value = "foobar";

export const about = {
	function: "Array.prototype.toLocaleString",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString",
	properties: ["<n>"],
	description: `
When Array.prototype.toLocaleString is used, holes in the array are not handled
and instead it will use polluted values for holes.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.tolocalestring",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const got = original.toLocaleString();
	if (got === "1,,3") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const got = original.toLocaleString();
	if (got === `1,${value},3`) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
