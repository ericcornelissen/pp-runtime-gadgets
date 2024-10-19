// SPDX-License-Identifier: BlueOak-1.0.0

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
		"test/built-ins/Object/prototype/__proto__/set-abrupt.js",
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
