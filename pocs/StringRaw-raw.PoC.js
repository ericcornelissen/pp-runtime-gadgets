// SPDX-License-Identifier: BlueOak-1.0.0

export const about = {
	function: "String.raw",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/raw",
	properties: ["'raw'"],
	description: `
TODO`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-string.raw",
	],
};

export function prerequisite() {
	try {
		String.raw({}, "foobar");
		return [false, "unexpected success"];
	} catch {
		return [true, null];
	}
}

export function test() {
	Object.prototype.raw = ["foo", "bar"];

	const got = String.raw({}, "foobar");
	if (got === "foofoobarbar") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.raw;
}
