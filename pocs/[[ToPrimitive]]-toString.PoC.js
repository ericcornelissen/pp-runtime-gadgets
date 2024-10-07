/*
Explanation:
When a value or object needs to be converted to a string in JavaScript its
`toString` method is called. Since this usually comes from the prototype, it can
be replaced with a custom function.

Specification:
1. https://tc39.es/ecma262/#sec-ordinarytoprimitive
2. https://tc39.es/ecma262/#sec-toprimitive
*/

const toStringBackup = Object.prototype.toString;

const string = "foobar";

export const about = {
	function: "[[ToPrimitive]]",
	properties: ["'toString'"],
};

export function prerequisite() {
	const got = ("" + {});
	if (got === "[object Object]") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.toString = () => string;

	const got = ("" + {});
	if (got === string) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	Object.prototype.toString = toStringBackup;
}
