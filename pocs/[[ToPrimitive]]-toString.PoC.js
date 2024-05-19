/*
Explanation:
When a value or object needs to be converted to a string in JavaScript its
`toString` method is called. Since this usually comes from the prototype, it can
be replaced with a custom function.

Specification:
1. https://tc39.es/ecma262/#sec-ordinarytoprimitive
2. https://tc39.es/ecma262/#sec-toprimitive
*/

(function() {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = (""+{});
if (before !== "[object Object]") {
	throw new Error(`unexpected behavior before pollution (got '${before}')`);
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.toString = () => "42";

const after = (""+{});
if (after === "42") {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype.toString;

})();
