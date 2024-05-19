/*
Explanation:
The `Object.fromEntries` function exists to convert key-value pairs stored in a
2-dimensional array into an object. It assumes all pairs it received actually
consist of 2 values (without checking the length), so if a pair is missing a
value or key and value the corresponding index will be looked up in the
prototype hierarchy instead.

Specification:
1. https://tc39.es/ecma262/#sec-createlistfromarraylike
2. https://tc39.es/ecma262/#sec-function.prototype.apply
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const p0 = "must be unique #1";
const p1 = "must be unique #2";
const p2 = "must be unique #3";
const v = "foobar";

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = Object.fromEntries([
	[p0, "some value"],
	[p1],
	[],
]);

if (!Object.hasOwn(before, p1)) {
	throw new Error("Property without value is not present");
} else if (before[p1] !== undefined) {
	throw new Error("Property without value is not undefined");
}

if (Object.hasOwn(before, p2)) {
	throw new Error("Polluted property is present");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype[0] = p2;
Object.prototype[1] = v;

const after = Object.fromEntries([
	[p0, "some value"],
	[p1],
	[],
]);

if (!Object.hasOwn(after, p1)) {
	throw new Error("property without value is not present");
}

if (after[p1] === v && after[p2] === v) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype[0];
delete Object.prototype[1];

})();
