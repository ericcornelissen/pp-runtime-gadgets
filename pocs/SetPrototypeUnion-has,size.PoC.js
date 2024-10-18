/*

Explanation:
To get the union of two sets the `contains` function first checks the `size` of
the Set (or rather any object) and it will then check if the provided Set `has`
the element of the `this` Set. By polluting

test262:
- tc39/test262/test/built-ins/Set/prototype/union/array-throws.js
*/

const set1 = new Set([1, 2]);
const set2 = [3];

export const about = {
	function: "Set.prototype.union",
	properties: ["'has'", "'size'"],
};

export function prerequisite() {
	try {
		set1.union(set2);
		return [false, "Unexpected success"];
	} catch (_) {
		return [true, null];
	}
}

export function test() {
	Object.prototype.size = 100;
	Object.prototype.has = () => false;

	const set3 = set1.union(set2);
	if (
		set3.size === 3
		&&
		set3.has(1)
		&&
		set3.has(2)
		&&
		set3.has(0)
	) {
		return true;
	} else {
		return false;
	}
}

export function cleanup() {
	delete Object.prototype.size;
	delete Object.prototype.has;
}
