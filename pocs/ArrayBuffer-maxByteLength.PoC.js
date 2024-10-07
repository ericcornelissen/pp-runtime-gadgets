/*
Explanation:
When an ArrayBuffer is constructed it optionally accepts a maximum length (in
bytes). If not explicitly set on the `options` object, it may read from the
prototype chain.

Specification:
1. https://tc39.es/ecma262/#sec-getarraybuffermaxbytelengthoption
2. https://tc39.es/ecma262/#sec-arraybuffer-length
*/

const length = 8;
const maxByteLength = 7;

export const about = {
	function: "new ArrayBuffer()",
	properties: ["'maxByteLength'"],
};

export function prerequisite() {
	if (length <= maxByteLength) {
		return [false, `${maxByteLength} < ${length} must hold`];
	}

	try {
		new ArrayBuffer(length);
		new ArrayBuffer(length, {});
		return [true, null];
	} catch (error) {
		return [false, error.toString()];
	}
}

export function test() {
	Object.prototype.maxByteLength = maxByteLength;

	try {
		new ArrayBuffer(8, {});
		return false;
	} catch (_) {
		return true;
	}
}

export function cleanup() {
	delete Object.prototype.maxByteLength;
}
