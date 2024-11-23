// SPDX-License-Identifier: BlueOak-1.0.0

const cause = "foobar";

export const about = {
	function: "new Error()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Error",
	properties: ["'cause'"],
	description: `
When a new Error is created the developer can choose to provide a 'cause'. If no
'cause' is provided it will be read from the prototype of the Error
constructor's second argument.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-installerrorcause",
		"https://tc39.es/ecma262/#sec-error-message",
	],
};

export function prerequisite() {
	const got = (new Error()).cause;
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.cause = cause;

	const got = (new Error()).cause;
	if (got === cause) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.cause;
}
