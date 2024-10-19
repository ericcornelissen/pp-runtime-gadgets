// SPDX-License-Identifier: BlueOak-1.0.0

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
