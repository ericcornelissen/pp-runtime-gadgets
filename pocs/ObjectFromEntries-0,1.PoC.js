/*
Explanation:
The `Object.fromEntries` function exists to convert key-value pairs stored in a
2-dimensional array into an object. It assumes all pairs it received actually
consist of 2 values (without checking the length), so if a pair is missing a
value or key and value the corresponding index will be looked up in the
prototype hierarchy instead.

Specification:
1. https://tc39.es/ecma262/#sec-createlistfromarraylike
2. https://tc39.es/ecma262/#sec-function.prototype.apply
*/

const p0 = "#1";
const p1 = "#2";
const p2 = "#3";
const v0 = "foo";
const v1 = "bar";

export const about = {
	function: "Object.fromEntries",
	properties: ["0", "1"],
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
