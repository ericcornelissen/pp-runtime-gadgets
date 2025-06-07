// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const subject = {};

export const about = {
	function: "Array.prototype.concat",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat",
	properties: ["@@isConcatSpreadable"],
	description: `
When Array.prototype.concat is used with something that is not an array, it will
by default add it to the 'this' array. If @@isConcatSpreadable is polluted to
true it will instead consider each item as an array-like, change the behavior.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-isconcatspreadable",
		"https://tc39.es/ecma262/#sec-array.prototype.concat",
	],
};

export function prerequisite() {
	const got = [].concat(subject);
	if (got.length === 1) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype[Symbol.isConcatSpreadable] = true;

	const got = [].concat(subject);
	if (got.length === 0) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[Symbol.isConcatSpreadable];
}

export function score() {
	return [
		scoring.INCORRECT_ARGUMENT_TYPE,
		scoring.SYMBOL_PROPERTY,
	];
}
