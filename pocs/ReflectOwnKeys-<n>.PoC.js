// SPDX-License-Identifier: BlueOak-1.0.0

const subject = new Proxy({}, {
	ownKeys() {
		return {
			length: 2,
			0: "foo",
		};
	},
});

export const about = {
	function: "Reflect.ownKeys",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys",
	properties: ["<n>"],
	description: `
The implementation of [[OwnPropertyKeys]] tries to convert the own keys returned
by a trapped object (e.g. proxied object), meaning that if the trap is
implemented incorrectly the list of keys can be affected by prototype pollution.

The root of the problem is that 'CreateListFromArrayLike' assumes array-like
object correctly report their length.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-reflect.ownkeys",
		"https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys",
		"https://tc39.es/ecma262/#sec-createlistfromarraylike",
	],
};

export function prerequisite() {
	try {
		const got = Reflect.ownKeys(subject);
		return [false, `got ${got}`];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype[1] = "bar";

	const got = Reflect.ownKeys(subject);
	if (
		got.length === 2
		&&
		got[0] === "foo"
		&&
		got[1] === "bar"
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}
