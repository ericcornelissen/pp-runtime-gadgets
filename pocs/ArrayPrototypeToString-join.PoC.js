// SPDX-License-Identifier: BlueOak-1.0.0

const arrayLike = {};
const value = "foobar";

export const about = {
	function: "Array.prototype.toString",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString",
	properties: ["'join'"],
	description: `
The toString specification for Arrays uses its 'join' function to convert arrays
to a string. For array-like function that don't implement a 'join' but are used
as 'this' value will use a polluted join function (despite not failing without
one).`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-array.prototype.tostring",
	],
};

export function prerequisite() {
	const got = Array.prototype.toString.call(arrayLike);
	if (got === arrayLike.toString()) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	Object.prototype.join = () => value;

	const got = Array.prototype.toString.call(arrayLike);
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.join;
}
