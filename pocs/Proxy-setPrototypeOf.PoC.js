// SPDX-License-Identifier: BlueOak-1.0.0

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'setPrototypeOf'"],
	description: `
To create a Proxy users need to provide an object as a second argument. This
object allows specifying a myriad of traps. Usually, if a specific trap is not
specified it is not used and usual behavior is maintained. However, if any of
the traps is present on the prototype it will be used. This is also the case for
proxies created *before* the pollution happened.`,
	test262: new Set([
		"test/built-ins/Array/prototype/splice/create-species-length-exceeding-integer-limit.js",
		"test/built-ins/Proxy/set/call-parameters-prototype-dunder-proto.js",
		"test/built-ins/Proxy/set/call-parameters-prototype.js",
		"test/built-ins/Object/getOwnPropertyDescriptors/proxy-undefined-descriptor.js",
		"test/built-ins/Array/prototype/reverse/length-exceeding-integer-limit-with-proxy.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy({}, {});
	Object.setPrototypeOf(subject, {foo: "bar"});
	const got = Object.getPrototypeOf(subject);
	if (got.foo === "bar") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	const subject = new Proxy({}, {});

	let flag = false;
	Object.prototype.setPrototypeOf = (target, propertyKey) => {
		flag = true;
		return Reflect.setPrototypeOf(target, propertyKey);
	};

	Object.setPrototypeOf(subject, {foo: "bar"});
	return flag;
}

export function cleanup() {
	delete Object.prototype.setPrototypeOf;
}
