/*
Explanation:
When using `matchAll` on a string, the provided object may be a string or a
regular expression, including a custom regular expression implementation. Any
object with the `Symbol.match` property is considered a regular expression. If
this is set alone, a type error will be thrown because for `matchAll` the regexp
flags must include the "g" flag, hence `flags` must be polluted too. Finally,
`matchAll` will use the function at `Symbol.matchAll` to perform the matching,
hence this key must be polluted too.

Specification:
1. https://tc39.es/ecma262/#sec-isregexp
2. https://tc39.es/ecma262/#sec-string.prototype.matchall
*/

(function() {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = [...("foobar".matchAll({}))];
if (before.length !== 3) {
	throw new Error("Unexpected behavior before polluting");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[Symbol.match] = true;
Object.prototype[Symbol.matchAll] = () => "Hello world!";
Object.prototype.flags = "g";

const after = [...("foobar".matchAll({}))];
if (after.length === 12) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype[Symbol.match];
delete Object.prototype[Symbol.replace];
delete Object.prototype.flags;

})();
