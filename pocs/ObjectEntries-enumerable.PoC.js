// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const propertyName = "foo";
const value = "bar";

const subject = new Proxy({
	[propertyName]: value,
}, {
	getOwnPropertyDescriptor() {
		return {
			configurable: true
		};
	}
});

export const about = {
	function: "Object.entries",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries",
	properties: ["'enumerable'"],
	description: `
The Object.defineProperty API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'enumerable' can be polluted to affect newly defined properties.

Notes:
- This is a known gadget and is mentioned on MDN.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.defineproperty",
		"https://tc39.es/ecma262/#sec-topropertydescriptor",
	],
};

export function prerequisite() {
	const got = Object.entries(subject);
	if (got.length === 0) {
		return [true, null];
	} else {
		return [false, `got [${got.join(",")}]`];
	}
}

export function test() {
	Object.prototype.enumerable = true;

	const after = Object.entries(subject);
	if (
		after.length === 1
		&&
		after[0][0] === propertyName
		&&
		after[0][1] === value
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.enumerable;
}

export function score() {
	return [
		scoring.FAULTY_IMPLEMENTATION,
		scoring.AFFECTS_PROXIES,
	];
}
