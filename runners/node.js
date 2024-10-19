// SPDX-License-Identifier: BlueOak-1.0.0

import { all, Outcome } from "./base.js";

for (const { about, result } of all()) {
	console.log(
		result.outcome,
		"-",
		about.function,
		"",
		about.properties.join(","),
	);

	if (result.outcome === Outcome.INVALID) {
		console.log(" ", result.reason, `(${result.detail})`)
	}
}
