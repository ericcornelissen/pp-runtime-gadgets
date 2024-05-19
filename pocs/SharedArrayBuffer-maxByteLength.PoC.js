/*
Explanation:
When an SharedSharedArrayBuffer is constructed it optionally accepts a maximum length
(in bytes). If not explicitly set on the `options` object, it may read from the
prototype chain.

Specification:
1. https://tc39.es/ecma262/#sec-getSharedArrayBuffermaxbytelengthoption
2. https://tc39.es/ecma262/#sec-sharedSharedArrayBuffer-length
*/

(function () {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

try {
	new SharedArrayBuffer(8);
	new SharedArrayBuffer(8, {});
} catch (error) {
	throw new Error(`failure before pollution (${error.message})`);
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.maxByteLength = 7;

try {
	new SharedArrayBuffer(8);
} catch (_) {
	throw new Error("pollution should have no effect without options argument");
}

try {
	new SharedArrayBuffer(6, {});
} catch (_) {
	throw new Error("pollution should have no effect if the given length is smaller than the maxByteLength");
}

let threw = false;
try {
	new SharedArrayBuffer(8, {});
} catch (_) {
	threw = true;
}

if (threw) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype.maxByteLength;

})();
