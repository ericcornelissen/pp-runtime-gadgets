/*
Explanation:
Using `.apply` on the function configures the thisArg (irrelevant) and args to
be used for a call to that function. Since args can be any array-like object, if
it is implemented incorrectly polluting the right property can be result in that
value being passed as an argument to the function being applied.

The root of the problem is that `CreateListFromArrayLike` assumes array-like
object correctly report their length.

Specification:
1. https://tc39.es/ecma262/#sec-createlistfromarraylike
2. https://tc39.es/ecma262/#sec-function.prototype.apply
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const thisArg = {};
const args = {
	length: 2,
	0: "foo",
};

function f(x, y) {
	return `${x}${y}`;
}

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = f.apply(thisArg, args);
if (before !== "fooundefined") {
	throw new Error("wrong result before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[1] = "bar";

const after = f.apply(thisArg, args);
if (after === "foobar") {
	console.log("Success");
} else if (after === before) {
	throw new Error("output did not change");
} else {
	throw new Error("pollution did not work as expected");
}

delete Object.prototype[1];

})();
