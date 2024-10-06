/*
Explanation:
The `Object.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including the `value` can be polluted to affect newly defined properties.

Notes:
- This is a known gadget and is mentioned on MDN.

Specification:
1. https://tc39.es/ecma262/#sec-object.defineproperty
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
Object.defineProperty(beforeO, p, {});

if (beforeO[p] !== undefined) {
	throw new Error("has a value by default");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.value = 42;

const afterO = {};
Object.defineProperty(afterO, p, { });

delete Object.prototype.value;

if (afterO[p] === 42) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

})();
