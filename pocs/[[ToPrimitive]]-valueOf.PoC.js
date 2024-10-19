// SPDX-License-Identifier: BlueOak-1.0.0

const valueOfBackup = Object.prototype.valueOf;

const value = 42;

export const about = {
	function: "[[ToPrimitive]]",
	properties: ["'valueOf'"],
	description: `
When a value or object needs to be converted to a value in JavaScript its
'valueOf' method is called. Since this usually comes from the prototype, it can
be replaced with a custom function.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-ordinarytoprimitive",
		"https://tc39.es/ecma262/#sec-toprimitive",
	],
};

export function prerequisite() {
	try {
		const got = (+{});
		if (isNaN(got)) {
			return [true, null];
		} else {
			return [false, `got ${got}`];
		}
	} catch (_) {
		return [true, null];
	}
}

export function test() {
	Object.prototype.valueOf = () => value;

	const got = (+{});
	if (got === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	Object.prototype.valueOf = valueOfBackup;
}
