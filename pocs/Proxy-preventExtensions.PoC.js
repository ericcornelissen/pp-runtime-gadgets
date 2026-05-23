// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'preventExtensions'"],
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
		"test/built-ins/Object/freeze/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/freeze/proxy-with-defineProperty-handler.js",
		"test/built-ins/Object/seal/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/seal/proxy-with-defineProperty-handler.js",
		"test/built-ins/Object/seal/seal-proxy.js",
	]),
};

export function prerequisite() {
	const subject = Object.seal(new Proxy({}, {}));
	try {
		subject.foo = "bar";
		return [false, "unexpected success"];
	} catch(_) {
		return [true, null];
	}
}

export function test() {
	const subject = new Proxy({}, {});

	let flag = false;
	Object.prototype.preventExtensions = (obj) => {
		flag = true;
		return Reflect.preventExtensions(obj);
	};

	Object.seal(subject);
	return flag;
}

export function cleanup() {
	delete Object.prototype.getOwnPropertyDescriptor;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
