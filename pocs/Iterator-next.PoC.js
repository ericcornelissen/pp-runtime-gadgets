/*
Explanation:
Any functionality operating on iterators assumes iterators are implemented
correctly, i.e. they return an object with a `next` function. If an operator
fails to do so, the `next` method may be looked up in the prototype hierarchy
instead.

Specification:
1. https://tc39.es/ecma262/#sec-getiteratorfrommethod
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const subject = {
	[Symbol.iterator]() {
		return { };
	}
};

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

let threw = false;
try {
	Array.from(subject);
} catch (_) {
	threw = true;
}

if (!threw) {
	throw new Error("no error thrown before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

let flag = false;
Object.prototype.next = () => {
	if (flag) {
		return { done: true };
	}

	flag = true;
	return { value: "foobar", done: false };
};

const list = Array.from(subject);
if (list.length === 1 && list[0] === "foobar") {
	console.log("Success");
} else {
	throw new Error("Failure");
}

delete Object.prototype.next;

})();
