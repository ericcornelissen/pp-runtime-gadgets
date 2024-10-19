// SPDX-License-Identifier: BlueOak-1.0.0

const value = "foobar";
const subject = {
	[Symbol.iterator]() {
		return {};
	}
};

export const about = {
	function: "Iterator",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator",
	properties: ["'next'"],
	description: `
Any functionality operating on iterators assumes iterators are implemented
correctly, i.e. they return an object with a 'next' function. If an operator
fails to do so, the 'next' method may be looked up in the prototype hierarchy
instead.`,
	spectrace: [
		"https://tc39.es/ecma262/#sec-getiteratorfrommethod",
	],
};

export function prerequisite() {
	try {
		Array.from(subject);
		return [false, "unexpected non-throw"];
	} catch (_) {
		return [true, null];
	}
}

export function test() {
	{
		let flag = false;
		Object.prototype.next = () => {
			if (flag) {
				return { done: true };
			}

			flag = true;
			return { value, done: false };
		};
	}

	const got = Array.from(subject);
	if (got.length === 1 && got[0] === value) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.next;
}
