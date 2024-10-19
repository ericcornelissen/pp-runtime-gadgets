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
