/*
Explanation:
The `Reflect.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including `set` can be polluted to affect newly defined properties.

Specification:
1. https://tc39.es/ecma262/#sec-reflect.defineproperty
2. https://tc39.es/ecma262/#sec-topropertydescriptor
*/

const propertyName = "foo";

export const about = {
	function: "Reflect.defineProperty",
	properties: ["'set'"],
};

export function prerequisite() {
	const object = {};
	Reflect.defineProperty(object, propertyName, { get: () => { } });

	try {
		object[propertyName] = 2;
		return [false, `unexpected non-throw`];
	} catch (_) {
		return [true, null];
	}
}

export function test() {
	let flag = false;
	Object.prototype.set = () => { flag = true; };

	const object = {};
	Reflect.defineProperty(object, propertyName, { get: () => { } });

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
