// SPDX-License-Identifier: BlueOak-1.0.0

const p0 = "#1";
const p1 = "#2";
const p2 = "#3";
const v0 = "foo";
const v1 = "bar";

export const about = {
	function: "Object.fromEntries",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries",
	properties: ["0", "1"],
	description: `
The Object.fromEntries function exists to convert key-value pairs stored in a
2-dimensional array into an object. It assumes all pairs it received actually
consist of 2 values (without checking the length), so if a pair is missing a
value or key and value the corresponding index will be looked up in the
prototype hierarchy instead.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-createlistfromarraylike",
		"https://tc39.es/ecma262/#sec-function.prototype.apply",
	],
};

export function prerequisite() {
	const object = Object.fromEntries([
		[p0, v0],
		[p1],
		[],
	]);

	if (
		Object.hasOwn(object, p0) && object[p0] === v0
		&&
		Object.hasOwn(object, p1) && object[p1] === undefined
		&&
		!Object.hasOwn(object, p2)
	) {
		return [true, null];
	} else {
		return [false, `got ${object}`];
	}
}

export function test() {
	Object.prototype[0] = p2;
	Object.prototype[1] = v1;

	const object = Object.fromEntries([
		[p0, v0],
		[p1],
		[],
	]);

	if (
		Object.hasOwn(object, p0) && object[p0] === v0
		&&
		Object.hasOwn(object, p1) && object[p1] === v1
		&&
		Object.hasOwn(object, p2) && object[p2] === v1
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
	delete Object.prototype[1];
}
