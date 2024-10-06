/*
Explanation:
The `Reflect.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including `writable` can be polluted to affect newly defined properties.

Specification:
1. https://tc39.es/ecma262/#sec-reflect.defineproperty
2. https://tc39.es/ecma262/#sec-topropertydescriptor
*/

(function () {

// -----------------------------------------------------------------------------
// --- SETUP -------------------------------------------------------------------
// -----------------------------------------------------------------------------

const p = "foobar";

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const beforeO = {};
Reflect.defineProperty(beforeO, p, { value: 42 });

try {
	beforeO[p] = 43;
} catch (_) { }

if (beforeO[p] === 43) {
	throw new Error("writable by default");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.writable = true;

const afterO = {};
Reflect.defineProperty(afterO, p, { value: 42 });

delete Object.prototype.writable;

try {
	afterO[p] = 43;
} catch (_) { }

if (afterO[p] === 43) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

})();
