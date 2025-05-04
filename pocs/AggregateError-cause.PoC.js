// SPDX-License-Identifier: BlueOak-1.0.0

const cause = "foobar";

export const about = {
	function: "new AggregateError()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError",
	properties: ["'cause'"],
	description: `
When a new AggregateError is created the developer can choose to provide a
'cause'. If no 'cause' is provided it will be read from the prototype of the
AggregateError constructor's third argument.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-installerrorcause",
		"https://tc39.es/ecma262/#sec-aggregate-error",
	],
};

export function prerequisite() {
	const got = (new AggregateError([])).cause;
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.cause = cause;

	const got = (new AggregateError([])).cause;
	if (got === cause) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.cause;
}
