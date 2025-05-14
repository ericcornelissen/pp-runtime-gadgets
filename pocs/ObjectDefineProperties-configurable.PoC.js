// SPDX-License-Identifier: BlueOak-1.0.0

const propertyName = "foobar";

export const about = {
	function: "Object.defineProperties",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties",
	properties: ["'configurable'"],
	description: `
The Object.defineProperties API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'configurable' can be polluted to affect newly defined properties.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.defineproperties",
		"https://tc39.es/ecma262/#sec-objectdefineproperties",
		"https://tc39.es/ecma262/#sec-topropertydescriptor",
	],
};

export function prerequisite() {
	const object = {};
	Object.defineProperties(object, {
		[propertyName]: {
			value: 42,
		},
	});

	const got = Object.getOwnPropertyDescriptor(object, propertyName);
	if (got.configurable) {
		return [false, "already configurable"];
	} else {
		return [true, null];
	}
}

export function test() {
	Object.prototype.configurable = true;

	const object = {};
	Object.defineProperties(object, {
		[propertyName]: {
			value: 42,
		},
	});

	const got = Object.getOwnPropertyDescriptor(object, propertyName);
	if (got.configurable) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.configurable;
}
