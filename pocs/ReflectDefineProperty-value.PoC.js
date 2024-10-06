/*
Explanation:
The `Reflect.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including the `value` can be polluted to affect newly defined properties.

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
Reflect.defineProperty(beforeO, p, {});

if (beforeO[p] !== undefined) {
	throw new Error("has a value by default");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.value = 42;

const afterO = {};
Reflect.defineProperty(afterO, p, { });

delete Object.prototype.value;

if (afterO[p] === 42) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

})();
