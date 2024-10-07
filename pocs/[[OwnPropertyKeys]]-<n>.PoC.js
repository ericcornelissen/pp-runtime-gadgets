/*
Explanation:
The implementation of [[OwnPropertyKeys]] tries to convert the own keys returned
by a trapped object (e.g. proxied object), meaning that if the trap is
implemented incorrectly the list of keys can be affected by prototype pollution.

The root of the problem is that `CreateListFromArrayLike` assumes array-like
object correctly report their length.

Notes:
- `Reflect.ownKeys` invokes [[OwnPropertyKeys]].

Specification:
1. https://tc39.es/ecma262/#sec-createlistfromarraylike
2. https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys
*/

const subject = new Proxy({}, {
	ownKeys() {
		return {
			length: 2,
			0: "foo",
		};
	}
});

export const about = {
	function: "[[OwnPropertyKeys]]",
	properties: ["<n>"],
};

export function prerequisite() {
	try {
		const got = Reflect.ownKeys(subject);
		return [false, `got ${got}`];
	} catch (_) {
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
