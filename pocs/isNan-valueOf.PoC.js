// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const valueOfBackup = Object.prototype.valueOf;

export const about = {
	function: "isNaN",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/isNaN",
	properties: ["'valueOf'"],
	description: `
The isNaN function accepts any argument and tells you if it is not a number. For
objects it will convert the object to a primitive value and check it, if you can
override the 'valueOf' function you control that primitive value and thus the
result.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-isnan-number",
		"https://tc39.es/ecma262/#sec-tonumber",
		"https://tc39.es/ecma262/#sec-toprimitive",
		"https://tc39.es/ecma262/#sec-ordinarytoprimitive",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	if (isNaN({})) {
		return [true, null];
	} else {
		return [false, `got `];
	}
}

export function test() {
	Object.prototype.valueOf = () => 42;
	if (isNaN({})) {
		return false;
	} else {
		return true;
	}
}

export function cleanup() {
	Object.prototype.valueOf = valueOfBackup;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
