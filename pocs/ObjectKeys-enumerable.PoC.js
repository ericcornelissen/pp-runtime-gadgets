// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const propertyName = "foo";

const subject = new Proxy({
	[propertyName]: "bar",
}, {
	getOwnPropertyDescriptor() {
		return {
			configurable: true
		};
	}
});

export const about = {
	function: "Object.keys",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",
	properties: ["'enumerable'"],
	description: `
To get the keys of an object JavaScript enumerates its properties. To
enumerate properties of an object, JavaScript relies on the 'enumerable'
property in each property's descriptor. If the descriptor is implemented
incorrectly (e.g. on a Proxy) the descriptor object becomes vulnerable to
prototype pollution, allowing you to make properties enumerable.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.keys",
		"https://tc39.es/ecma262/#sec-enumerableownproperties",
	],
};

export function prerequisite() {
	const got = Object.keys(subject);
	if (got.length === 0) {
		return [true, null];
	} else {
		return [false, `got [${got.join(",")}]`];
	}
}

export function test() {
	Object.prototype.enumerable = true;

	const got = Object.keys(subject);
	if (got.length === 1 && got[0] === propertyName) {
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
		scoring.REQUIRES_PROXY,
	];
}
