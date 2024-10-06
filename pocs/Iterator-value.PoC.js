/*
Explanation:
Any functionality operating on iterators assumes iterators are implemented
correctly, i.e. the `next` function returns objects with a `value` and `done`
key. If an operator fails to do so, the `value` property may be looked up in the
hierarchy instead.

Specification:
1. https://tc39.es/ecma262/#sec-iteratorvalue
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const value = "foobar";
const subject = {
	[Symbol.iterator]() {
		let done = true;
		return {
			next() {
				done = !done;
				return { done };
			},
		};
	}
};

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = Array.from(subject);
if (before.length !== 1 && before[0] !== undefined) {
	throw new Error("unexpected behavior before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.value = value;

const after = Array.from(subject);
delete Object.prototype.value;

if (after.length === 1 && after[0] === value) {
	console.log("Success");
} else {
	throw new Error("Failure");
}

})();
