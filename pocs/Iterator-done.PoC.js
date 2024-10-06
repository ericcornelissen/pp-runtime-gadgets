/*
Explanation:
Any functionality operating on iterators assumes iterators are implemented
correctly, i.e. the `next` function returns objects with a `value` and `done`
key. If an operator fails to do so, the `done` property may be looked up in the
hierarchy instead.

Specification:
1. https://tc39.es/ecma262/#sec-iteratorcomplete
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const subject = {
	[Symbol.iterator]() {
		return {
			next() {
				return { value: "foobar" };
			},
		};
	}
};

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

// n/a

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.done = true;

const list = Array.from(subject);
if (list.length === 0) {
	console.log("Success");
} else {
	throw new Error("Failure");
}

delete Object.prototype.done;

})();
