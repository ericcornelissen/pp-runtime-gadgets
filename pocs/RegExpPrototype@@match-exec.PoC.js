// SPDX-License-Identifier: BlueOak-1.0.0

const subject = {};

export const about = {
	function: "RegExp.prototype[@@match]",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match",
	properties: ["'exec'"],
	description: `
`,
	test262: new Set([
		"test/built-ins/RegExp/prototype/Symbol.match/this-val-non-regexp.js",
	]),
};

export function prerequisite() {
	try {
		RegExp.prototype[Symbol.match].call(subject);
		return [false, "unexpected success"];
	} catch (_) {
		return [true, null];
	}
}

export function test() {
	Object.prototype.exec = () => null;

	const got = RegExp.prototype[Symbol.match].call(subject);
	if (got === null) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.exec;
}
