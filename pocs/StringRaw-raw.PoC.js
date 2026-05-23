// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

export const about = {
	function: "String.raw",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
	properties: ["'raw'"],
	description: `
The String.raw function takes a template and a set of substitutions. If the
template is an object, the raw property is used as a list of literals into which
the substitutions are placed. Hence, if the template is an object without the
raw property it could be polluted to control the resulting string.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-string.raw",
	],
};

export function prerequisite() {
	try {
		String.raw({}, "foobar");
		return [false, "unexpected success"];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype.raw = ["foo", "bar"];

	const got = String.raw({}, "foobar");
	if (got === "foofoobarbar") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.raw;
}

export function score() {
	return [
		scoring.INCORRECT_ARGUMENT_TYPE,
	];
}
