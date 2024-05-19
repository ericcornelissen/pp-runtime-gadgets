/*
Explanation:
The `Object.defineProperty` API accepts a descriptor object for the property
being defined. Since this is a regular JavaScript object, any properties not
explicitly specified will be looked up in the prototype. Hence, any property,
including `enumerable` can be polluted to affect newly defined properties.

Notes:
- This is a known gadget and is mentioned on MDN.

Specification:
1. https://tc39.es/ecma262/#sec-topropertydescriptor
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
Object.defineProperty(beforeO, p, { value: 42 });

const beforeD = Object.getOwnPropertyDescriptor(beforeO, p);
if (beforeD.enumerable) {
	throw new Error("enumerable by default");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.enumerable = true;

const afterO = {};
Object.defineProperty(afterO, p, { value: 42 });

const afterD = Object.getOwnPropertyDescriptor(afterO, p);
if (afterD.enumerable) {
	console.log("Success");
} else {
	throw new Error("Failed");
}

delete Object.prototype.enumerable;

})();
