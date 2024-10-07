import { tests } from "../pocs/index.js";

/**
 * @typedef TestResult
 * @property {About} about
 * @property {Object} result
 * @property {Outcome} result.outcome
 * @property {string?} result.reason
 * @property {string?} result.detail
 */

/**
 * @typedef About
 * @property {string} function
 * @property {string[]} properties
 */

/**
 * @typedef {("FAILURE"|"INVALID"|"SUCCESS")} Outcome
 */

function Failure() {
	return Object.freeze({
		outcome: Outcome.FAILURE,
		reason: null,
		detail: null,
	});
}

function Invalid(reason, detail) {
	return Object.freeze({
		outcome: Outcome.INVALID,
		reason,
		detail,
	});
}

function Success() {
	return Object.freeze({
		outcome: Outcome.SUCCESS,
		reason: null,
		detail: null,
	});
}

/**
 * @type Object<Outcome,Outcome>
 */
export const Outcome = Object.freeze({
	FAILURE: "FAILURE",
	INVALID: "INVALID",
	SUCCESS: "SUCCESS",
});

/**
 * @generator
 * @yields {TestResult} The next number in the Fibonacci sequence.
 */
export function* all() {
	for (const index in tests) {
		const testCase = tests[index];

		try {
			const [ok, message] = testCase.prerequisite();
			if (!ok) {
				yield {
					about: testCase.about,
					result: Invalid("prerequisite failed", message),
				};
				continue;
			}

			const passed = testCase.test();
			testCase.cleanup();

			if (passed) {
				yield {
					about: testCase.about,
					result: Success(),
				};
			} else {
				yield {
					about: testCase.about,
					result: Failure(),
				};
			}
		} catch (error) {
			testCase.cleanup();

			yield {
				about: testCase.about,
				result: Invalid("unexpected error", error.toString()),
			};
		}
	}
}
