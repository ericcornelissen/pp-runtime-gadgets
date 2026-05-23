// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const object = { a: 1, b: 2, c: 3 };
const replacer = ["a", /* hole */, "c"];

export const about = {
	function: "JSON.stringify",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
	properties: ["<n>"],
	description: `
The JSON.stringify function accepts a second argument which may be an array of
keys to *keep*. If this array contains holes, these can be polluted to cause
JSON.stringify to include any key.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-json.stringify",
	],
};

export function prerequisite() {
	const got = JSON.stringify(object, replacer);
	if (got === '{"a":1,"c":3}') {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}

}

export function test() {
	Object.prototype[1] = "b";

	const got = JSON.stringify(object, replacer);
	if (got === '{"a":1,"b":2,"c":3}') {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}

export function score() {
	return [
		scoring.MISSING_EXPECTED_KEY,
		scoring.OPTIONAL_OBJECT,
	];
}
