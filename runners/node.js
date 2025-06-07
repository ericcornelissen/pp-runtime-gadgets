// SPDX-License-Identifier: BlueOak-1.0.0

import { all, Outcome } from "./base.js";

for (const { about, result } of all()) {
	switch (result.outcome) {
	case Outcome.SUCCESS:
		console.log(
			result.outcome,
			`(${result.score})`,
			"-",
			about.function,
			"",
			about.properties.join(","),
		);
		break;
	case Outcome.FAILURE:
		console.log(
			result.outcome,
			"-",
			about.function,
			"",
			about.properties.join(","),
		);
		break;
	case Outcome.INVALID:
		console.log(
			result.outcome,
			"-",
			about.function,
			"",
			about.properties.join(","),
		);
		console.log(" ", result.reason, `(${result.detail})`);
		break;
	}
}
