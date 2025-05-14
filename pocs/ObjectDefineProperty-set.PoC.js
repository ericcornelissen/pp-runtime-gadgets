// SPDX-License-Identifier: BlueOak-1.0.0

const propertyName = "foo";

export const about = {
	function: "Object.defineProperty",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty",
	properties: ["'set'"],
	description: `
The Object.defineProperty API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'set' can be polluted to affect newly defined properties.

Notes:
- This is a known gadget and is mentioned on MDN.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.defineproperty",
		"https://tc39.es/ecma262/#sec-topropertydescriptor",
	],
};

export function prerequisite() {
	const object = {};
	Object.defineProperty(object, propertyName, { get: () => { } });

	try {
		object[propertyName] = 2;
		return [false, `unexpected non-throw`];
	} catch {
		return [true, null];
	}
}

export function test() {
	let flag = false;
	Object.prototype.set = () => { flag = true; };

	const object = {};
	Object.defineProperty(object, propertyName, { get: () => {} });

	object[propertyName] = "anything";
	if (flag) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.set;
}
