/*
Explanation:
Using `.apply` on the function configures the thisArg (irrelevant) and args to
be used for a call to that function. Since args can be any array-like object, if
it is implemented incorrectly polluting the right property can be result in that
value being passed as an argument to the function being applied.

The root of the problem is that `CreateListFromArrayLike` assumes array-like
object correctly report their length.

Specification:
1. https://tc39.es/ecma262/#sec-createlistfromarraylike
2. https://tc39.es/ecma262/#sec-function.prototype.apply
*/

const thisArg = {};

const args = {
	length: 2,
	0: "foo",
};

function f(x, y) {
	return `${x} ${y}`;
}

export const about = {
	function: "Function.prototype.apply",
	properties: ["<n>"],
};

export function prerequisite() {
	const got = f.apply(thisArg, args);
	if (got === "foo undefined") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[1] = "bar";

	const got = f.apply(thisArg, args);
	if (got === "foo bar") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
