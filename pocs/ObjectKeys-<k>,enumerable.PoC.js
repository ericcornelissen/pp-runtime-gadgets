// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const subject = new Proxy({}, {
	getOwnPropertyDescriptor() {
		return { configurable: true };
	},
	ownKeys() {
		return {
			length: 2,
			0: "foo",
		};
	},
});

export const about = {
	function: "Object.keys",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys",
	properties: ["<k>", "enumerable"],
	description: `
To get the keys of an object JavaScript enumerates its properties. To
enumerate properties of an object, JavaScript relies on the 'enumerable'
property in each property's descriptor. If the descriptor is implemented
incorrectly (e.g. on a Proxy) the descriptor object becomes vulnerable to
prototype pollution, allowing you to make properties enumerable.

Moreover, if the ownKeys of the proxy is not implemented correctly it is
possible to add arbitrary keys too.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.keys",
		"https://tc39.es/ecma262/#sec-enumerableownproperties",
		"https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys",
	],
};

export function prerequisite() {
	try {
		const got = Object.keys(subject);
		return [true, `got ${got}`];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype[1] = "bar";
	Object.prototype.enumerable = true;

	const got = Object.keys(subject);
	if (got.length === 2 && got[0] === "foo" && got[1] === "bar") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
	delete Object.prototype.enumerable;
}

export function score() {
	return [
		scoring.FAULTY_IMPLEMENTATION,
		scoring.REQUIRES_PROXY,
	];
}
