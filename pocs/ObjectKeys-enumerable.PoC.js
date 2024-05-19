/*
Explanation:
To get the keys of an object JavaScript enumerates its properties. To
enumerate properties of an object, JavaScript relies on the `enumerable`
property in each property's descriptor. If the descriptor is implemented
incorrectly (e.g. on a `Proxy`) the descriptor object becomes vulnerable to
prototype pollution, allowing you to make properties enumerable.

Specification:
1. https://tc39.es/ecma262/#sec-enumerableownproperties
1. https://tc39.es/ecma262/#sec-object.keys
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const subject = new Proxy({ foo: "bar" }, {
	getOwnPropertyDescriptor() {
		return {
			configurable: true
		};
	}
});

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = Object.keys(subject);
if (before.length !== 0) {
	throw new Error("unexpected behavior before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.enumerable = true;

const after = Object.keys(subject);
if (after.length === 1) {
	console.log("Success");
} else if (after.length === before.length) {
	throw new Error("Failed");
} else {
	throw new Error("Unexpected effect");
}

delete Object.prototype.enumerable;

})();
