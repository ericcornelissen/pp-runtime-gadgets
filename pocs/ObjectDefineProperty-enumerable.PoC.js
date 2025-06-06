// SPDX-License-Identifier: BlueOak-1.0.0

const propertyName = "foobar";

export const about = {
	function: "Object.defineProperty",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",
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
	const object = {};
	Object.defineProperty(object, propertyName, { value: 42 });

	const got = Object.getOwnPropertyDescriptor(object, propertyName);
	if (got.enumerable) {
		return [false, "already enumerable"];
	} else {
		return [true, null];
	}
}

export function test() {
	Object.prototype.enumerable = true;

	const object = {};
	Object.defineProperty(object, propertyName, { value: 42 });

	const got = Object.getOwnPropertyDescriptor(object, propertyName);
	if (got.enumerable) {
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
		// none
	];
}
