/*
Explanation:
The `String.prototype.startsWith` function cannot be used with a regular
expression as `searchString` and the specification requires this is checked. If
it is a regular expression as `searchString` it must throw a type error. But if
it is used with another non-string object there is no problem. The way the spec
says you need to check for a regular expression is by checking it's either a
real regular expression (internal check) or it has a `Symbol.match` property.
Hence, by polluting this property you can break the `startsWith` functionality.

Specification:
1. https://tc39.es/ecma262/#sec-isregexp
2. https://tc39.es/ecma262/#sec-string.prototype.startswith
*/

export const about = {
	function: "String.prototype.startsWith",
	properties: ["@@match"],
};

export function prerequisite() {
	try {
		"foobar".startsWith({});
		return [true, null];
	} catch (error) {
		return [false, `got ${error.toString()}`];
	}
}

export function test() {
	Object.prototype[Symbol.match] = true;

	try {
		"foobar".startsWith({});
		return false;
	} catch (_) {
		return true;
	}
}

export function cleanup() {
	delete Object.prototype[Symbol.match];
}
