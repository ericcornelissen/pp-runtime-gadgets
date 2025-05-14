// SPDX-License-Identifier: BlueOak-1.0.0

export const about = {
	function: "String.prototype.endsWith",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith",
	properties: ["@@match"],
	description: `
The String.prototype.endsWith function cannot be used with a regular
expression as 'searchString' and the specification requires this is checked. If
it is a regular expression as 'searchString' it must throw a type error. But if
it is used with another non-string object there is no problem. The way the spec
says you need to check for a regular expression is by checking it's either a
real regular expression (internal check) or it has a Symbol.match property.
Hence, by polluting this property you can break the 'endsWith' functionality.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-string.prototype.endswith",
		"https://tc39.es/ecma262/#sec-isregexp",
	],
};

export function prerequisite() {
	try {
		"foobar".endsWith({});
		return [true, null];
	} catch (error) {
		return [false, `got ${error.toString()}`];
	}
}

export function test() {
	Object.prototype[Symbol.match] = true;

	try {
		"foobar".endsWith({});
		return false;
	} catch {
		return true;
	}
}

export function cleanup() {
	delete Object.prototype[Symbol.match];
}
