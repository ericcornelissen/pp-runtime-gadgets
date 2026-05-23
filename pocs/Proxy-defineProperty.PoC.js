// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const property = "foo";
const value = "bar";
const object = { };

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'defineProperty'"],
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
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-missing-target-is-proxy.js",
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-undefined-target-is-proxy.js",
		"test/built-ins/Object/freeze/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Array/prototype/splice/create-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined-no-property.js",
		"test/built-ins/Proxy/set/trap-is-missing-target-is-proxy.js",
		"test/built-ins/Proxy/set/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined-target-is-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy(object, {});
	subject[property] = value;
	const got = subject[property];
	if (got === value) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	const subject = new Proxy(object, {});

	let flag = false;
	Object.prototype.defineProperty = () => {
		flag = true;
		return true;
	};

	subject[property] = value;
	return flag;
}

export function cleanup() {
	delete Object.prototype.defineProperty;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
