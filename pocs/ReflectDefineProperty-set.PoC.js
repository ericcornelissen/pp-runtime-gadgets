/*
Explanation:
The `Reflect.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including `set` can be polluted to affect newly defined properties.

Specification:
1. https://tc39.es/ecma262/#sec-reflect.defineproperty
2. https://tc39.es/ecma262/#sec-topropertydescriptor
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const p = "foobar";
let value = 1;

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

// n/a

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.set = () => {value = 42};

const afterO = {};
Reflect.defineProperty(afterO, p, { get: () => value });

afterO[p] = 2;
if (afterO[p] === 42) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype.set;

})();
