// SPDX-License-Identifier: BlueOak-1.0.0

import { scoring } from "./score.js";

const createSubject = () => new Proxy({}, {
	ownKeys() {
		return {
			length: 2,
			0: "foo",
		};
	},
});

export const about = {
	function: "Object.seal",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/seal",
	properties: ["<k>"],
	description: `
`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-object.seal",
		"https://tc39.es/ecma262/#sec-setintegritylevel",
		"https://tc39.es/ecma262/#sec-proxy-object-internal-methods-and-internal-slots-ownpropertykeys",
	],
};

export function prerequisite() {
	const subject = createSubject();
	try {
		Object.seal(subject);
		return [false, "unexpected success"];
	} catch {
		return [true, null];
	}
}

export function test() {
	const subject = createSubject();

	Object.prototype[1] = "bar";

	Object.seal(subject);
	if (
		Object.hasOwn(subject, "foo") && Object.hasOwn(subject, "bar")
	) {
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
		scoring.REQUIRES_PROXY,
	];
}
