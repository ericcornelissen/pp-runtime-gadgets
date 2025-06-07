// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const value = "bar";
const args = {
	length: 2,
	0: "foo",
};

function c(x, y) {
	this.x = x;
	this.y = y;
}

export const about = {
	function: "Reflect.construct",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/construct",
	properties: ["<n>"],
	description: `
Using Reflect.construct on a function configures the args to be used for a
construction of an object by that function. Since args can be any array-like
object, if it is implemented incorrectly polluting the right property can be
result in that value being passed as an argument to the function being
constructed.

The root of the problem is that 'CreateListFromArrayLike' assumes array-like
object correctly report their length.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-reflect.construct",
		"https://tc39.es/ecma262/#sec-createlistfromarraylike",
	],
};

export function prerequisite() {
	const got = Reflect.construct(c, args);
	if (got.y === undefined) {
		return [true, null];
	} else {
		return [false, `got ${got.y}`];
	}
}

export function test() {
	Object.prototype[1] = value;

	const after = Reflect.construct(c, args);
	if (after.y === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[1];
}

export function score() {
	return [
		scoring.FAULTY_IMPLEMENTATION,
	];
}
