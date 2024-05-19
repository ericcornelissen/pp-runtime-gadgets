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

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const subject = new Proxy({}, {
	ownKeys() {
		return {
			length: 2,
			0: "foo",
		};
	}
});

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

let threw = false;
try {
	Reflect.ownKeys(subject);
} catch (_) {
	threw = true;
}

if (!threw) {
	throw new Error("no error thrown before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[1] = "bar";

const ownKeys = Reflect.ownKeys(subject);
if (ownKeys[0] !== "foo") {
	throw new Error(`unexpected value for expected key (got '${ownKeys[0]}')`);
}

if (ownKeys[1] === "bar") {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype[1];

})();
