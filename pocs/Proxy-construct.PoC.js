// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const property = "foo";
const value = "bar";
const ctor = function() {this[property] = value};

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'construct'"],
	description: `
To create a Proxy users need to provide an object as a second argument. This
object allows specifying a myriad of traps. Usually, if a specific trap is not
specified it is not used and usual behavior is maintained. However, if any of
the traps is present on the prototype it will be used. This is also the case for
proxies created *before* the pollution happened.`,
	test262: new Set([
		"test/built-ins/Array/prototype/lastIndexOf/calls-only-has-on-prototype-after-length-zeroed.js",
		"test/built-ins/Array/prototype/indexOf/calls-only-has-on-prototype-after-length-zeroed.js",
		"test/built-ins/Proxy/has/call-in-prototype-index.js",
		"test/built-ins/Proxy/set/call-parameters-prototype-index.js",
		"test/built-ins/Array/prototype/reverse/length-exceeding-integer-limit-with-proxy.js",
		"test/built-ins/Function/internals/Construct/base-ctor-revoked-proxy-realm.js",
		"test/built-ins/Function/internals/Construct/base-ctor-revoked-proxy.js",
	]),
};

export function prerequisite() {
	const Subject = new Proxy(ctor, {});
	const got = new Subject();
	if (got[property] === value) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	const Subject = new Proxy(ctor, {});

	let flag = false;
	Object.prototype.construct = (target, argumentsList, newTarget) => {
		flag = true;
		return Reflect.construct(target, argumentsList, newTarget);
	};

	new Subject();
	return flag;
}

export function cleanup() {
	delete Object.prototype.deleteProperty;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
