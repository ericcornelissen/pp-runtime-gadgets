/*
Explanation:
When converting an object to a string it will produce a string like "[object X]"
where X depends on the type of object. If @@toStringTag is set to a string it
replaces whatever X would have been.

Specification:
1. https://tc39.es/ecma262/#sec-object.prototype.tostring
*/

const tag = "foobar";
const subject = {};

export const about = {
	function: "Object.prototype.toString",
	properties: ["@@toStringTag"],
};

export function prerequisite() {
	const got = subject.toString();
	if (got === "[object Object]") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[Symbol.toStringTag] = tag;

	const got = subject.toString();
	if (got === `[object ${tag}]`) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[Symbol.toStringTag];
}
