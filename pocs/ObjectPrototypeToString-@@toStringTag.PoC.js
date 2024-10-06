/*
Explanation:
When converting an object to a string it will produce a string like "[object X]"
where X depends on the type of object. If @@toStringTag is set to a string it
replaces whatever X would have been.

Specification:
1. https://tc39.es/ecma262/#sec-object.prototype.tostring
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const tag = "foobar";

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = {}.toString();
if (before !== "[object Object]") {
	throw new Error("unexpected behavior before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[Symbol.toStringTag] = tag;

const after = {}.toString();
if (after === `[object ${tag}]`) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype[Symbol.toStringTag];

})();
