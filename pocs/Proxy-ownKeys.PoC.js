// SPDX-License-Identifier: BlueOak-1.0.0

const value = "foobar";

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'ownKeys'"],
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
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-missing-target-is-proxy.js",
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-undefined-target-is-proxy.js",
		"test/built-ins/Object/values/order-after-define-property.js",
		"test/built-ins/Object/freeze/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/freeze/proxy-with-defineProperty-handler.js",
		"test/built-ins/Object/isSealed/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/isFrozen/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/seal/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/seal/proxy-with-defineProperty-handler.js",
		"test/built-ins/Object/seal/seal-proxy.js",
		"test/built-ins/Proxy/ownKeys/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/enumerate/removed-does-not-trigger.js",
		"test/built-ins/JSON/parse/reviver-object-define-prop-err.js",
		"test/built-ins/Object/assign/source-own-prop-error.js",
		"test/built-ins/Object/defineProperties/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/getOwnPropertyDescriptors/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Proxy/ownKeys/trap-is-undefined.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy({}, {});
	const keys = Object.getOwnPropertyNames(subject);
	const got = keys.length;
	if (got === 0) {
		return [true, null];
	} else {
		return [false, `unexpected length (got ${got})`];
	}
}

export function test() {
	const subject = new Proxy({}, {});

	Object.prototype.ownKeys = () => [value];

	const keys = Object.getOwnPropertyNames(subject);
	if (keys.length === 1 && keys[0] === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.ownKeys;
}
