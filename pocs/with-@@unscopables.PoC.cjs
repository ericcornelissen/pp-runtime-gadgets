// SPDX-License-Identifier: BlueOak-1.0.0

const value = "bar";
const property = "foo";
const context = { [property]: value };

const about = {
	function: "with",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/with",
	properties: ["@@unscopables"],
	description: `
The @@unscopables object is used by the 'with' statement to determine what
properties of the context object are available inside the 'with' block. If not
specified, the @@unscopables can be polluted to manipulate the available
properties in the context.`,
	test262: new Set([
		"test/built-ins/Proxy/has/call-with.js",
		"test/built-ins/Proxy/has/return-true-target-prop-exists-using-with.js",
	]),
};

function prerequisite() {
	const got = eval(`with (context) { ${property} }`);
	if (got === value) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
};

function test() {
	Object.prototype[Symbol.unscopables] = {
		[property]: true,
	};

	try {
		eval(`with (context) { ${property} }`);
		return false;
	} catch {
		return true;
	}
};

function cleanup() {
	delete Object.prototype[Symbol.unscopables];
};

console.log(
	prerequisite()
		? test() ? "SUCCESS" : "FAILURE"
		: "INVALID"
);
