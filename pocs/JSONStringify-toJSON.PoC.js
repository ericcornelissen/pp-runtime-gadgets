/*
Explanation:
The `JSON.stringify` function allows objects to specify custom serialization via
the toJSON method. Hence, by polluting this you can control how objects without
an explicit toJSON method are serialized.

Specification:
1. https://tc39.es/ecma262/#sec-json.stringify
2. https://tc39.es/ecma262/#sec-serializejsonproperty
*/

(function () {

// -----------------------------------------------------------------------------
// --- ORIGINAL ----------------------------------------------------------------
// -----------------------------------------------------------------------------

const before = JSON.stringify({});
if (before !== "{}") {
	throw new Error("unexpected result before pollution");
}

// -----------------------------------------------------------------------------
// --- POLLUTED ----------------------------------------------------------------
// -----------------------------------------------------------------------------

Object.prototype.toJSON = function() {
	return [];
};

const after = JSON.stringify({});
if (after === "[]") {
	console.log("Success");
} else if (after === before) {
	throw new Error("output did not change");
} else {
	throw new Error("pollution did not work as expected");
}

delete Object.prototype.toJSON;

})();
