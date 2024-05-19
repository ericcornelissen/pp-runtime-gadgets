/*
Explanation:
When using `replaceAll` on a string, the provided object may be a string or a
regular expression, including a custom regular expression implementation. Any
object with the `Symbol.match` property is considered a regular expression. If
this is set alone, a type error will be thrown because for `replaceAll` the
regexp flags must include the "g" flag, hence `flags` must be polluted too.
Finally, `replaceAll` will use the function at `Symbol.replace` to do the
replacement, hence this key must be polluted too.

Specification:
1. https://tc39.es/ecma262/#sec-isregexp
2. https://tc39.es/ecma262/#sec-string.prototype.replaceall
*/

(function() {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = "foobar".replaceAll({}, "baz");
if (before !== "foobar") {
	throw new Error("Unexpected behavior before polluting");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[Symbol.match] = true;
Object.prototype[Symbol.replace] = () => "Hello world!";
Object.prototype.flags = "g";

const after = "foobar".replaceAll({}, "baz");
if (after === "Hello world!") {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype[Symbol.match];
delete Object.prototype[Symbol.replace];
delete Object.prototype.flags;

})();
