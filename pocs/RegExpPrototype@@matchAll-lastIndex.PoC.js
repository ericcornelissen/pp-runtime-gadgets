// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const subject = {
	flags: "g",
};

export const about = {
	function: "RegExp.prototype[@@matchAll]",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.matchAll",
	properties: ["'lastIndex'"],
	description: `
The @@matchAll implementation assumes the 'lastIndex' property is always present
on the RegExp. For a faulty RegExp it may be initially missing (after which the
@@matchAll implementation sets it), in which case it can be polluted.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-regexp-prototype-%symbol.matchall%",
	],
};

export function prerequisite() {
	const got = Array.from(RegExp.prototype[Symbol.matchAll].call(subject, "foobar"));
	if (
		got.length === 3
		&&
		got[0][0] === "o" && got[1][0] === "o" && got[2][0] === "b"
	) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.lastIndex = 42;

	const got = Array.from(RegExp.prototype[Symbol.matchAll].call(subject, "foobar"));
	if (got.length === 0) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.lastIndex;
}

export function score() {
	return [
		scoring.FAULTY_IMPLEMENTATION,
	];
}
