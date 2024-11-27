// SPDX-License-Identifier: BlueOak-1.0.0

const value = "foobar";
const subject = {
	[Symbol.iterator]() {
		let done = true;
		return {
			next() {
				done = !done;
				return { done };
			},
		};
	}
};

export const about = {
	function: "Iterator",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator",
	properties: ["'value'"],
	description: `
Any functionality operating on iterators assumes iterators are implemented
correctly, i.e. the 'next' function returns objects with a 'value' and 'done'
key. If an operator fails to do so, the 'value' property may be looked up in the
hierarchy instead.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-iteratorvalue",
	],
	test262: new Set([
		"test/built-ins/Array/from/iter-set-elem-prop-err.js",
		"test/built-ins/Array/from/iter-set-length.js",
	]),
};

export function prerequisite() {
	const got = Array.from(subject);
	if (got.length === 1 && got[0] === undefined) {
		return [true, null];
	} else {
		return [false, `got [${got.join(",")}]`];
	}
}

export function test() {
	Object.prototype.value = value;

	const got = Array.from(subject);
	if (got.length === 1 && got[0] === value) {
		return true;
	} else {
		return false;
	}

}

export function cleanup() {
	delete Object.prototype.value;
}
