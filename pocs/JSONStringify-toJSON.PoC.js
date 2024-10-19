// SPDX-License-Identifier: BlueOak-1.0.0

export const about = {
	function: "JSON.stringify",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify",
	properties: ["'toJSON'"],
	description: `
The JSON.stringify function allows objects to specify custom serialization via
the toJSON method. Hence, by polluting this you can control how objects without
an explicit toJSON method are serialized.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-json.stringify",
		"https://tc39.es/ecma262/#sec-serializejsonproperty",
	],
};

export function prerequisite() {
	const got = JSON.stringify({});
	if (got === "{}") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}

}

export function test() {
	Object.prototype.toJSON = () => [];

	const got = JSON.stringify({});
	if (got === "[]") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.toJSON;
}
