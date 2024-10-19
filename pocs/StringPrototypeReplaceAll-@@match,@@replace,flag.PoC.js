// SPDX-License-Identifier: BlueOak-1.0.0

const value = "Hello world!";

export const about = {
	function: "String.prototype.replaceAll",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll",
	properties: ["@@match", "@@replace", "'flag'"],
	description: `
When using replaceAll on a string, the provided object may be a string or a
regular expression, including a custom regular expression implementation. Any
object with the Symbol.match property is considered a regular expression. If
this is set alone, a type error will be thrown because for replaceAll the
regexp flags must include the "g" flag, hence 'flags' must be polluted too.
Finally, replaceAll will use the function at Symbol.replace to do the
replacement, hence this key must be polluted too.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-string.prototype.replaceall",
		"https://tc39.es/ecma262/#sec-isregexp",
	],
};

export function prerequisite() {
	const got = "foobar".replaceAll({}, "baz");
	if (got === "foobar") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[Symbol.match] = true;
	Object.prototype[Symbol.replace] = () => value;
	Object.prototype.flags = "g";

	const after = "foobar".replaceAll({}, "baz");
	if (after === value) {
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
