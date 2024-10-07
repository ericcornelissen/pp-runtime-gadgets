/*
Explanation:
The `Object.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including the `value` can be polluted to affect newly defined properties.

Notes:
- This is a known gadget and is mentioned on MDN.

Specification:
1. https://tc39.es/ecma262/#sec-object.defineproperty
2. https://tc39.es/ecma262/#sec-topropertydescriptor
*/

const propertyName = "foo";
const value = "bar";

export const about = {
	function: "Object.defineProperty",
	properties: ["'value'"],
};

export function prerequisite() {
	const object = {};
	Object.defineProperty(object, propertyName, {});

	const got = object[propertyName];
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got value '${got}'`];
	}
}

export function test() {
	Object.prototype.value = value;

	const object = {};
	Object.defineProperty(object, propertyName, {});

	const got = object[propertyName];
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.value;
}
