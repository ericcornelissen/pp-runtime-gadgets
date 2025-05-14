// SPDX-License-Identifier: BlueOak-1.0.0

const subject = {
	get next() {
		let count = 3;
		return function () {
			--count;
			return count >= 0
				? { done: false, value: count }
				: { done: true, value: undefined };
		};
	},
};

export const about = {
	function: "Iterator",
	link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator",
	properties: ["'return'"],
	description: `
Iterators internally use a 'return' function to determine if the iterator should
exit early or not. For custom iterators, if this function is missing it can be
polluted and will be used as such.`,
	test262: new Set([
		"test/built-ins/Iterator/prototype/every/this-plain-iterator.js",
		"test/built-ins/Iterator/prototype/find/this-plain-iterator.js",
		"test/built-ins/Iterator/prototype/some/this-plain-iterator.js",
	]),
};

export function prerequisite() {
	const got = Iterator.prototype.find.call(subject, entry => entry < 1);
	if (got === 0) {
		return [true, null];
	} else {
		return [false, `got ${got}`];
	}
}

export function test() {
	let flag = false;
	Object.prototype.return = () => {
		flag = true;
		return { };
	};

	const got = Iterator.prototype.find.call(subject, entry => entry < 1);
	return flag && got === 0;
}

export function cleanup() {
	delete Object.prototype.return;
}
