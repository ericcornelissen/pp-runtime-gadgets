// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const pattern = { [Symbol.match]: true };
const source = "foobar";

export const about = {
	function: "new RegExp()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/RegExp",
	properties: ["'source'"],
	description: `
When the pattern provided to the RegExp constructor is an object which is
determined to be a regular expression by 'IsRegExp' (which it will be if the
@@match property is truthy) it will use the source property to construct the
new regular expression. Hence, if a faulty expression implementation is provided
a polluted source pattern may be used instead.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-regexp-pattern-flags",
		"https://tc39.es/ecma262/#sec-isregexp",
	],
	test262: new Set([
		"test/built-ins/RegExp/from-regexp-like-get-flags-err.js",
	]),
};

export function prerequisite() {
	const got = new RegExp(pattern);
	const want = new RegExp();
	if (got.source === want.source) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.source = source;

	const got = new RegExp(pattern);
	if (got.source === source) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.source;
}

export function score() {
	return [
		scoring.FAULTY_IMPLEMENTATION,
	];
}
