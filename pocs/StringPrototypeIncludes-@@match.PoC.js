/*
Explanation:
The `String.prototype.includes` function cannot be used with a regular
expression as `searchString` and the specification requires this is checked. If
it is a regular expression as `searchString` it must throw a type error. But if
it is used with another non-string object there is no problem. The way the spec
says you need to check for a regular expression is by checking it's either a
real regular expression (internal check) or it has a `Symbol.match` property.
Hence, by polluting this property you can break the `includes` functionality.

Specification:
1. https://tc39.es/ecma262/#sec-isregexp
2. https://tc39.es/ecma262/#sec-string.prototype.includes
*/

(function() {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

let threwBefore = false;
try {
	"foobar".includes({});
} catch (_) {
	threwBefore = true;
}

if (threwBefore) {
	throw new Error("unexpected result before polluting");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[Symbol.match] = true;

let threwAfter = false;
try {
	"foobar".includes({});
} catch (_) {
	threwAfter = true;
}

if (threwAfter) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype[Symbol.match];

})();
