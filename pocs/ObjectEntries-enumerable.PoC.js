/*
Explanation:
To get the entries of an object JavaScript enumerates its properties. To
enumerate properties of an object, JavaScript relies on the `enumerable`
property in each property's descriptor. If the descriptor is implemented
incorrectly (e.g. on a `Proxy`) the descriptor object becomes vulnerable to
prototype pollution, allowing you to make properties enumerable.

Specification:
1. https://tc39.es/ecma262/#sec-enumerableownproperties
1. https://tc39.es/ecma262/#sec-object.entries
*/

const propertyName = "foo";
const value = "bar";

const subject = new Proxy({
	[propertyName]: value,
}, {
	getOwnPropertyDescriptor() {
		return {
			configurable: true
		};
	}
});

export const about = {
	function: "Object.entries",
	properties: ["'enumerable'"],
};

export function prerequisite() {
	const got = Object.entries(subject);
	if (got.length === 0) {
		return [true, null];
	} else {
		return [false, `got [${got.join(",")}]`];
	}
}

export function test() {
	Object.prototype.enumerable = true;

	const after = Object.entries(subject);
	if (
		after.length === 1
		&&
		after[0][0] === propertyName
		&&
		after[0][1] === value
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.enumerable;
}
