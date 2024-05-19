/*
Explanation:
Using `Reflect.construct` on a function configures the args to be used for a
construction of an object by that function. Since args can be any array-like
object, if it is implemented incorrectly polluting the right property can be
result in that value being passed as an argument to the function being
constructed.

The root of the problem is that `CreateListFromArrayLike` assumes array-like
object correctly report their length.

Specification:
1. https://tc39.es/ecma262/#sec-createlistfromarraylike
2. https://tc39.es/ecma262/#sec-reflect.construct
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const args = {
	length: 2,
	0: "foo",
};

function c(x, y) {
	this.x = x;
	this.y = y;
}

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = Reflect.construct(c, args);
if (before.y !== undefined) {
	throw new Error("wrong result before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[1] = "bar";

const after = Reflect.construct(c, args);
if (after.y === "bar") {
	console.log("Success");
} else if (after.y === undefined) {
	throw new Error("Failed");
} else {
	throw new Error("Pollution did not work as expected");
}

delete Object.prototype[1];

})();
