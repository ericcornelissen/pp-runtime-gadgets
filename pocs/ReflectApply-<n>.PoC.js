// SPDX-License-Identifier: BlueOak-1.0.0

const value = "bar";
const thisArg = {};
const args = {
	length: 2,
	0: "foo",
};

function f(x, y) {
	return `${x} ${y}`;
}

export const about = {
	function: "Reflect.apply",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply",
	properties: ["<n>"],
	description: `
Using Reflect.apply on a function configures the thisArg (irrelevant) and args
to be used for a call to that function. Since args can be any array-like object,
if it is implemented incorrectly polluting the right property can be result in
that value being passed as an argument to the function being applied.

The root of the problem is that 'CreateListFromArrayLike' assumes array-like
object correctly report their length.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-reflect.apply",
		"https://tc39.es/ecma262/#sec-createlistfromarraylike",
	],
};

export function prerequisite() {
	const got = Reflect.apply(f, thisArg, args);
	if (got === "foo undefined") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const after = Reflect.apply(f, thisArg, args);
	if (after === `foo ${value}`) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
