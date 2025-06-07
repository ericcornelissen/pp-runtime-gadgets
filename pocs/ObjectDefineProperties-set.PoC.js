// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const propertyName = "foo";

export const about = {
	function: "Object.defineProperties",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties",
	properties: ["'set'"],
	description: `
The Object.defineProperties API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including 'set' can be polluted to affect newly defined properties.`,
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
			get: () => { },
		},
	});

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
	Object.defineProperties(object, {
		[propertyName]: {
			get: () => { },
		},
	});

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

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
