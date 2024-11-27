// SPDX-License-Identifier: BlueOak-1.0.0

const length = 8;
const maxByteLength = 7;

export const about = {
	function: "new SharedArrayBuffer()",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer",
	properties: ["'maxByteLength'"],
	description: `
When an SharedSharedSharedArrayBuffer is constructed it optionally accepts a maximum length
(in bytes). If not explicitly set on the 'options' object, it may read from the
prototype chain.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-sharedSharedSharedArrayBuffer-length",
		"https://tc39.es/ecma262/#sec-getSharedSharedArrayBuffermaxbytelengthoption",
	],
	test262: new Set([
		"test/built-ins/SharedArrayBuffer/options-maxbytelength-undefined.js",
	]),
};

export function prerequisite() {
	if (length <= maxByteLength) {
		return [false, `${maxByteLength} < ${length} must hold`];
	}

	try {
		new SharedArrayBuffer(length);
		new SharedArrayBuffer(length, {});
		return [true, null];
	} catch (error) {
		return [false, error.toString()];
	}
}

export function test() {
	Object.prototype.maxByteLength = maxByteLength;

	try {
		new SharedArrayBuffer(8, {});
		return false;
	} catch (_) {
		return true;
	}
}

export function cleanup() {
	delete Object.prototype.maxByteLength;
}
