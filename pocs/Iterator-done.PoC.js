// SPDX-License-Identifier: BlueOak-1.0.0

const subject = {
	[Symbol.iterator]() {
		let i = 0;
		return {
			next() {
				i += 1;
				if (i === 1) {
					return { value: "foo" };
				} else {
					return { value: "bar", done: true };
				}
			},
		};
	}
};

export const about = {
	function: "Iterator",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator",
	properties: ["'done'"],
	description: `
Any functionality operating on iterators assumes iterators are implemented
correctly, i.e. the 'next' function returns objects with a 'value' and 'done'
key. If an operator fails to do so, the 'done' property may be looked up in the
hierarchy instead.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-iteratorcomplete",
	],
};

export function prerequisite() {
	const got = Array.from(subject);
	if (got.length === 1 && got[0] === "foo") {
		return [true, null];
	} else {
		return [false, `got [${got.join(",")}]`];
	}
}

export function test() {
	Object.prototype.done = true;

	const got = Array.from(subject);
	if (got.length === 0) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.done;
}
