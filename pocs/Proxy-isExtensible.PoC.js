// SPDX-License-Identifier: BlueOak-1.0.0

const property = "foo";
const value = "bar";
const object = { [property]: value };

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'isExtensible'"],
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
		"test/built-ins/Object/isSealed/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Object/isFrozen/proxy-no-ownkeys-returned-keys-order.js",
		"test/built-ins/Proxy/setPrototypeOf/return-abrupt-from-target-getprototypeof.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy(object, {});
	const got = Reflect.isExtensible(subject);
	if (got === true) {
		return [true, null];
	} else {
		return [false, "not extensible"];
	}
}

export function test() {
	const subject = new Proxy({}, {});

	Object.prototype.isExtensible = () => false;

	try {
		const got = Reflect.isExtensible(subject);
		if (got === false) {
			return true;
		} else {
			return false;
		}
	} catch (_) {
		// may cause an error if polluted extensibility does not match the
		// actual extensibility.
		return true;
	}
}

export function cleanup() {
	delete Object.prototype.isExtensible;
}
