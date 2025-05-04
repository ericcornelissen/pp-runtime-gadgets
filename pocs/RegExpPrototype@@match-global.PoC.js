// SPDX-License-Identifier: BlueOak-1.0.0

let c = 0;
const subject = {
	exec: (s) => c < s.length ? [s.charAt(c++)] : null,
};

export const about = {
	function: "RegExp.prototype[@@match]",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match",
	properties: ["'global'"],
	description: `
The @@match implementation will lookup the flags and change its behavior in
accordance with the flags set. Depending on the runtime, the 'flags' property
itself may be foregone and instead be parsed as RegExp.prototype.flags would. In
this case the individual flag properties, such as 'global' can be polluted to
change the behavior of the match.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-regexp.prototype-%symbol.match%",
		"https://tc39.es/ecma262/#sec-get-regexp.prototype.flags",
	],
};

export function prerequisite() {
	const got = RegExp.prototype[Symbol.match].call(subject, "foobar");
	if (got.length === 1 && got[0] === "f") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.global = true;

	const got = RegExp.prototype[Symbol.match].call(subject, "foobar");
	if (
		got.length === 5
		&&
		got[0] === "o" && got[1] === "o" && got[2] === "b" && got[3] === "a" && got[4] === "r"
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.global;
}
