// SPDX-License-Identifier: BlueOak-1.0.0

const propertyName = "foo";
const oldValue = "bar";
const newValue = "baz";

export const about = {
	function: "Object.defineProperty",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",
	properties: ["'writable'"],
	description: `
The Object.defineProperty API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'writable' can be polluted to affect newly defined properties.

Notes:
- This is a known gadget and is mentioned on MDN.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.defineproperty",
		"https://tc39.es/ecma262/#sec-topropertydescriptor",
	],
};

export function prerequisite() {
	if (oldValue === newValue) {
		return [false, "old and new value are the same"];
	}

	const object = {};
	Object.defineProperty(object, propertyName, { value: oldValue });

	try {
		object[propertyName] = newValue;
		return [false, "writable by default"];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype.writable = true;

	const object = {};
	Object.defineProperty(object, propertyName, { value: oldValue });

	object[propertyName] = newValue;
	if (object[propertyName] === newValue) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.writable;
}

export function score() {
	return [
		// none
	];
}
