// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

let c = 0;
const subject = {
	exec: () => c++ % 2 === 0 ? {} : null,

	// for firefox
	flags: "g",

	// for v8-based runtimes
	global: true,
};

export const about = {
	function: "RegExp.prototype[@@match]",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match",
	properties: ["0"],
	description: `
The @@match implementation assumes returned match objects are well-formed, if
this is not the case the '0' property can be polluted to set matched values.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-regexp.prototype-%symbol.match%",
	],
};

export function prerequisite() {
	const got = RegExp.prototype[Symbol.match].call(subject, "foobar");
	if (got.length === 1 && got[0] === "undefined") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[0] = "baz";

	const got = RegExp.prototype[Symbol.match].call(subject, "foobar");
	if (got.length === 1 && got[0] === "baz") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
}

export function score() {
	return [
		scoring.FAULTY_IMPLEMENTATION,
	];
}
