/*
Explanation:
When an SharedSharedSharedArrayBuffer is constructed it optionally accepts a maximum length
(in bytes). If not explicitly set on the `options` object, it may read from the
prototype chain.

Specification:
1. https://tc39.es/ecma262/#sec-getSharedSharedArrayBuffermaxbytelengthoption
2. https://tc39.es/ecma262/#sec-sharedSharedSharedArrayBuffer-length
*/

const length = 8;
const maxByteLength = 7;

export const about = {
	function: "new SharedArrayBuffer()",
	properties: ["'maxByteLength'"],
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
