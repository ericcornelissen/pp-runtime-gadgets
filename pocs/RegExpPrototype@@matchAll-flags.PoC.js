// SPDX-License-Identifier: BlueOak-1.0.0

const subject = {};

export const about = {
	function: "RegExp.prototype[@@matchAll]",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.matchAll",
	properties: ["'flags'"],
	description: `
The @@matchAll implementation reads the 'flags' property of the this value. If
a faulty implementation is missing it, it can be polluted to control the
behavior of the matching.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-regexp-prototype-%symbol.matchall%",
	],
};

export function prerequisite() {
	try {
		RegExp.prototype[Symbol.matchAll].call(subject, "foobar");
		return [false, "unexpected success"];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype.flags = "g";

	const got = Array.from(RegExp.prototype[Symbol.matchAll].call(subject, "foobar"));
	if (
		got.length === 3
		&&
		got[0][0] === "o" && got[1][0] === "o" && got[2][0] === "b"
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.flags;
}
