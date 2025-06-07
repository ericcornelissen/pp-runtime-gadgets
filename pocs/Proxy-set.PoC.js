// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'set'"],
	description: `
To create a Proxy users need to provide an object as a second argument. This
object allows specifying a myriad of traps. Usually, if a specific trap is not
specified it is not used and usual behavior is maintained. However, if any of
the traps is present on the prototype it will be used. This is also the case for
proxies created *before* the pollution happened.`,
	test262: new Set([
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-missing-target-is-proxy.js",
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/getOwnPropertyDescriptor/trap-is-undefined-target-is-proxy.js",
		"test/built-ins/Object/values/order-after-define-property.js",
		"test/built-ins/Array/prototype/splice/create-proxy.js",
		"test/built-ins/Proxy/set/trap-is-undefined-no-property.js",
		"test/built-ins/Object/prototype/__proto__/set-abrupt.js",
		"test/built-ins/Proxy/defineProperty/targetdesc-undefined-target-is-not-extensible-realm.js",
		"test/built-ins/Proxy/set/trap-is-missing-receiver-multiple-calls-index.js",
		"test/built-ins/Proxy/set/trap-is-missing-receiver-multiple-calls.js",
		"test/built-ins/Proxy/set/trap-is-null-receiver.js",
	]),
};

export function prerequisite() {
	try {
		const subject = new Proxy({}, {});
		subject.foo = "bar";
		return [true, null];
	} catch (error) {
		return [false, `unexpected error ${error}`];
	}
}

export function test() {
	const subject = new Proxy({}, {});

	let flag = false;
	Object.prototype.set = () => {
		flag = true;
		return true;
	};

	subject.foo = "bar";
	return flag;
}

export function cleanup() {
	delete Object.prototype.set;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
