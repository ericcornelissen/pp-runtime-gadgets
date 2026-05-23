// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const p0 = "#1";
const p1 = "#2";
const p2 = "#3";
const v0 = "foo";
const v1 = "bar";

export const about = {
	function: "new Map()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map",
	properties: ["0", "1"],
	description: `
The Map constructor converts key-value pairs stored in a 2-dimensional array
into a new Map. It assumes all pairs it received actually consist of 2 values
(without checking the length), so if a pair is missing a value or key and value
the corresponding index will be looked up in the prototype hierarchy instead.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-map-constructor",
		"https://tc39.es/ecma262/#sec-add-entries-from-iterable",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	const map = new Map([
		[p0, v0],
		[p1],
		[],
	]);

	if (
		map.has(p0) && map.get(p0) === v0
		&&
		map.has(p1) && map.get(p1) === undefined
		&&
		!map.has(p2)
	) {
		return [true, null];
	} else {
		return [false, `got ${map}`];
	}
}

export function test() {
	Object.prototype[0] = p2;
	Object.prototype[1] = v1;

	const map = new Map([
		[p0, v0],
		[p1],
		[],
	]);

	if (
		map.has(p0) && map.get(p0) === v0
		&&
		map.has(p1) && map.get(p1) === v1
		&&
		map.has(p2) && map.get(p2) === v1
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype[0];
	delete Object.prototype[1];
}

export function score() {
	return [
		scoring.MISSING_EXPECTED_KEY,
	];
}
