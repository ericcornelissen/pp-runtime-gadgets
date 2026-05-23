// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

export const about = {
	function: "Response.json",
	link: "https://developer.mozilla.org/en-US/docs/Web/API/Response/json_static",
	properties: ["'toJSON'"],
	description: `
The static Response.json function allows for creating an instance of Reponse
holding the provided object as JSON data. Internally, toJSON is used when it is
present. Hence, by polluting this you can control how objects without an
explicit toJSON method are serialized.`,
	found_using_strategy: "iterate",
};

export async function prerequisite() {
	const got = await Response.json({}).text();
	if (got === "{}") {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}

}

export async function test() {
	Object.prototype.toJSON = () => [];
	const response = Response.json({});

	delete Object.prototype.toJSON;
	const got = await response.text();
	if (got === "[]") {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.toJSON;
}

export function score() {
	return [
		scoring.POLLUTE_WITH_FUNCTION,
	];
}
