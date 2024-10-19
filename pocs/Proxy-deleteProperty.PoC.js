// SPDX-License-Identifier: BlueOak-1.0.0

const property = "foo";
const value = "bar";
const object = { [property]: value };

export const about = {
	function: "new Proxy()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy",
	properties: ["'deleteProperty'"],
	description: `
To create a Proxy users need to provide an object as a second argument. This
object allows specifying a myriad of traps. Usually, if a specific trap is not
specified it is not used and usual behavior is maintained. However, if any of
the traps is present on the prototype it will be used. This is also the case for
proxies created *before* the pollution happened.`,
	test262: new Set([
		"test/built-ins/Proxy/deleteProperty/trap-is-undefined-not-strict.js",
	]),
};

export function prerequisite() {
	const subject = new Proxy(object, {});
	const got = subject[property];
	if (got === value) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	const subject = new Proxy({}, {});

	let flag = false;
	Object.prototype.deleteProperty = () => {
		flag = true;
		return true;
	};

	delete subject[property];
	return flag;
}

export function cleanup() {
	delete Object.prototype.deleteProperty;
}
