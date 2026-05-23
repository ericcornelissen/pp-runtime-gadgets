// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const tag = "foobar";
const subject = {};

export const about = {
	function: "Object.prototype.toString",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString",
	properties: ["@@toStringTag"],
	description: `
When converting an object to a string it will produce a string like "[object X]"
where X depends on the type of object. If @@toStringTag is set to a string it
replaces whatever X would have been.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.prototype.tostring",
	],
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

export function score() {
	return [
		scoring.SYMBOL_PROPERTY,
	];
}
