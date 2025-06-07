// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'getOwnPropertyDescriptor'"],
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
		"test/built-ins/Object/values/order-after-define-property.js",
		"test/built-ins/Object/freeze/proxy-with-defineProperty-handler.js",
		"test/built-ins/Array/prototype/splice/create-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined-no-property.js",
		"test/built-ins/Proxy/set/trap-is-missing-target-is-proxy.js",
		"test/built-ins/Proxy/set/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined-target-is-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined.js",
		"test/built-ins/Proxy/ownKeys/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/defineProperty/targetdesc-undefined-target-is-not-extensible-realm.js",
		"test/built-ins/Proxy/enumerate/removed-does-not-trigger.js",
		"test/built-ins/JSON/parse/reviver-object-define-prop-err.js",
		"test/built-ins/Object/assign/source-own-prop-desc-missing.js",
		"test/built-ins/Object/keys/proxy-non-enumerable-prop-invariant-3.js",
		"test/built-ins/Object/prototype/__lookupSetter__/lookup-own-proto-err.js",
		"test/built-ins/Object/prototype/__lookupSetter__/lookup-proto-proto-err.js",
		"test/built-ins/Object/prototype/__lookupGetter__/lookup-own-proto-err.js",
		"test/built-ins/Proxy/ownKeys/call-parameters-object-keys.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy({any:"thing"}, {});
	const keys = Object.keys(subject);
	const got = keys.length;
	if (got === 1) {
		return [true, null];
	} else {
		return [false, `unexpected length (got ${got})`];
	}
}

export function test() {
	const subject = new Proxy({any:"thing"}, {});

	let flag = false;
	Object.prototype.getOwnPropertyDescriptor = (target, propertyKey) => {
		flag = true;
		return Reflect.getOwnPropertyDescriptor(target, propertyKey);
	};

	Object.keys(subject);
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
