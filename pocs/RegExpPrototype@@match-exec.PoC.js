// SPDX-License-Identifier: BlueOak-1.0.0

const subject = {};

export const about = {
	function: "RegExp.prototype[@@match]",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/Symbol.match",
	properties: ["'exec'"],
	description: `
The @@match implementation will internally try to 'exec'ute the RegExp to get
the return value. For a faulty RegExp implementation to exec property could be
polluted.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-regexp.prototype-%symbol.match%",
		"https://tc39.es/ecma262/#sec-regexpexec",
	],
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
