// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const propertyName = "foo";
const value = "bar";

export const about = {
	function: "Object.defineProperties",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties",
	properties: ["'get'"],
	description: `
The Object.defineProperties API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'get' can be polluted to affect newly defined properties.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.defineproperties",
		"https://tc39.es/ecma262/#sec-objectdefineproperties",
		"https://tc39.es/ecma262/#sec-topropertydescriptor",
	],
};

export function prerequisite() {
	const object = {};
	Object.defineProperties(object, {
		[propertyName]: { },
	});

	const got = object[propertyName];
	if (got === undefined) {
		return [true, null];
	} else {
		return [false, `got value ${got}`];
	}
}

export function test() {
	Object.prototype.get = () => value;

	const object = {};
	Object.defineProperties(object, {
		[propertyName]: { },
	});

	if (object[propertyName] === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.get;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION
	];
}
