/*
Explanation:
When using `matchAll` on a string, the provided object may be a string or a
regular expression, including a custom regular expression implementation. Any
object with the `Symbol.match` property is considered a regular expression. If
this is set alone, a type error will be thrown because for `matchAll` the regexp
flags must include the "g" flag, hence `flags` must be polluted too. Finally,
`matchAll` will use the function at `Symbol.matchAll` to perform the matching,
hence this key must be polluted too.

Specification:
1. https://tc39.es/ecma262/#sec-isregexp
2. https://tc39.es/ecma262/#sec-string.prototype.matchall
*/

const value = "Hello world!";

export const about = {
	function: "String.prototype.matchAll",
	properties: ["@@match", "@@matchAll", "'flag'"],
};

export function prerequisite() {
	const got = [...("foobar".matchAll({}))];
	if (got.length === 3) {
		return [true, null];
	} else {
		return [false, `got ${got.join(",")}`];
	}
}

export function test() {
	Object.prototype[Symbol.match] = true;
	Object.prototype[Symbol.matchAll] = () => value;
	Object.prototype.flags = "g";

	const after = [...("foobar".matchAll({}))];
	if (after.length === value.length) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[Symbol.match];
	delete Object.prototype[Symbol.replace];
	delete Object.prototype.flags;
}
