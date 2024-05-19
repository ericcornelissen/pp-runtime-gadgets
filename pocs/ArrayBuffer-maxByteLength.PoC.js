/*
Explanation:
When an ArrayBuffer is constructed it optionally accepts a maximum length (in
bytes). If not explicitly set on the `options` object, it may read from the
prototype chain.

Specification:
1. https://tc39.es/ecma262/#sec-getarraybuffermaxbytelengthoption
2. https://tc39.es/ecma262/#sec-arraybuffer-length
*/

(function() {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

try {
	new ArrayBuffer(8);
	new ArrayBuffer(8, {});
} catch (_) {
	throw new Error("failure before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.maxByteLength = 7;

try {
	new ArrayBuffer(8);
} catch (_) {
	throw new Error("pollution should have no effect without options argument");
}

try {
	new ArrayBuffer(6, {});
} catch (_) {
	throw new Error("pollution should have no effect if the given length is smaller than maxByteLength");
}

let threw = false;
try {
	new ArrayBuffer(8, {});
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
