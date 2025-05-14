// SPDX-License-Identifier: BlueOak-1.0.0

const thisArg = {};
const name = "g";

function f(x, y) {
	return `${x} ${y}`;
}

export const about = {
	function: "Function.prototype.bind",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind",
	properties: ["'name'"],
	description: `
When binding a function its 'name' property is changed to 'bound <name>'. If the
function does not have an own name property (which is not the case by default)
its name will be looked up in the prototype.

This test typically fails because Function.prototype.name is set to an empty
string by the runtime, but this is not defined in the spec.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-function.prototype.bind",
	],
};

export function prerequisite() {
	const got = f.bind(thisArg).name;
	if (got === "bound f") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.name = name;

	delete f.name;
	const got = f.bind(thisArg).name;
	if (got === `bound ${name}`) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.name;
}
