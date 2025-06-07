// SPDX-License-Identifier: BlueOak-1.0.0

export const scoring = Object.freeze({
	/**
	 * The gadget requires polluting with a function.
	 */
	POLLUTE_WITH_FUNCTION: Symbol(),

	/**
	 * The gadget requires a custom implementation that does not follow a specification.
	 */
	FAULTY_IMPLEMENTATION: Symbol(),

	/**
	 * The gadget requires an optional object is explicitly provided.
	 */
	OPTIONAL_OBJECT: Symbol(),

	/**
	 * The gadget requires an expected property is missing (e.g. holes in array).
	 */
	MISSING_EXPECTED_KEY: Symbol(),

	/**
	 * The gadget requires an incorrect argument (e.g. wrong type) is provided.
	 */
	INCORRECT_ARGUMENT_TYPE: Symbol(),

	/**
	 * The gadget requires polluting a property which is a symbol.
	 */
	SYMBOL_PROPERTY: Symbol(),

	/**
	 * The gadget requires being called with a non-standard `this` value.
	 */
	NON_STANDARD_THIS: Symbol(),

	/**
	 * The gadget requires a proxied object.
	 */
	REQUIRES_PROXY: Symbol()
});

export function computeScore(scorePoints) {
	let score = 0;
	for (const scorePoint of scorePoints) {
		switch (scorePoint) {
		case scoring.POLLUTE_WITH_FUNCTION:
			score += 3;
			break;
		case scoring.FAULTY_IMPLEMENTATION:
			score += 2;
			break;
		case scoring.OPTIONAL_OBJECT:
			score += 1;
			break;
		case scoring.MISSING_EXPECTED_KEY:
			score += 1;
			break;
		case scoring.INCORRECT_ARGUMENT_TYPE:
			score += 2;
			break;
		case scoring.SYMBOL_PROPERTY:
			score += 3;
			break;
		case scoring.NON_STANDARD_THIS:
			score += 2;
			break;
		case scoring.REQUIRES_PROXY:
			score += 3;
			break;
		}
	}

	return score;
}
