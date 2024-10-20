// SPDX-License-Identifier: BlueOak-1.0.0

const valueOriginal = "foobar";
const valuePolluted = "foobaz";
const fn = () => valueOriginal;

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'apply'"],
	description: `
To create a Proxy users need to provide an object as a second argument. This
object allows specifying a myriad of traps. Usually, if a specific trap is not
specified it is not used and usual behavior is maintained. However, if any of
the traps is present on the prototype it will be used. This is also the case for
proxies created *before* the pollution happened.

Note that this does requires the proxy is on a function, it cannot make
non-function objects callable.`,
	test262: new Set([
		"test/built-ins/Array/prototype/lastIndexOf/calls-only-has-on-prototype-after-length-zeroed.js",
		"test/built-ins/Array/prototype/indexOf/calls-only-has-on-prototype-after-length-zeroed.js",
		"test/built-ins/Proxy/has/call-in-prototype-index.js",
		"test/built-ins/Proxy/set/call-parameters-prototype-index.js",
		"test/built-ins/Array/prototype/reverse/length-exceeding-integer-limit-with-proxy.js",
		"test/built-ins/Proxy/create-target-is-not-a-constructor.js",
		"test/built-ins/Proxy/apply/trap-is-null-target-is-proxy.js",
		"test/built-ins/Proxy/apply/trap-is-undefined-no-property.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy(fn, {});
	const got = subject();
	if (got === valueOriginal) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	const subject = new Proxy(fn, {});

	Object.prototype.apply = () => valuePolluted;

	const got = subject();
	if (got === valuePolluted) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.apply;
}
