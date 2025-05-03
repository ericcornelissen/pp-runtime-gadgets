// SPDX-License-Identifier: BlueOak-1.0.0

const set1 = new Set([1, 2]);
const set2 = [3];

export const about = {
	function: "Set.prototype.isSupersetOf",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/isSupersetOf",
	properties: ["'has'", "'size'"],
	description: `
To find out if one sets is a superset of another the function first checks the
'size' of the Set (or rather any object) and it will then check if the provided
Set 'has' the element of the 'this' Set. By polluting the 'size' to be greater
than the array length and 'has' to always return false, all objects from the
non-set object will be added to the first set.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-set.prototype.issupersetof",
		"https://tc39.es/ecma262/#sec-getsetrecord",
	],
	test262: new Set([
	]),
};

export function prerequisite() {
	try {
		set1.isSupersetOf(set2);
		return [false, "Unexpected success"];
	} catch (_) {
		return [true, null];
	}
}

export function test() {
	Object.prototype.has = () => true;
	Object.prototype.size = 2;

	const got = set1.isSupersetOf(set2);
	if (got === false) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.has;
	delete Object.prototype.size;
}
