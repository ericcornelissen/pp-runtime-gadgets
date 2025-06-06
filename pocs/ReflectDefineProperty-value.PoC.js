// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const propertyName = "foo";
const value = "bar";

export const about = {
	function: "Reflect.defineProperty",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/defineProperty",
	properties: ["'value'"],
	description: `
The Reflect.defineProperty API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'value' can be polluted to affect newly defined properties.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-reflect.defineproperty",
		"https://tc39.es/ecma262/#sec-topropertydescriptor",
	],
};

export function prerequisite() {
	const object = {};
	Reflect.defineProperty(object, propertyName, {});

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
	Reflect.defineProperty(object, propertyName, {});

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

export function score() {
	return [
		scoring.MISSING_EXPECTED_KEY,
	];
}
