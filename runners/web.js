// SPDX-License-Identifier: BlueOak-1.0.0

import { all, Outcome } from "./base.js";

const $results = document.getElementById("results");
for (const { about, result } of all()) {
	const $api = document.createElement("td");
	if (about.link) {
		const $link = document.createElement("a");
		$link.setAttribute("href", about.link);
		$link.innerText = about.function;
		$api.appendChild($link);
	} else {
		$api.innerText = about.function;
	}

	const $properties = document.createElement("td");
	{
		const $span = document.createElement("span");
		$span.setAttribute("title", about.description.trim());
		$span.innerText = about.properties.join(",");
		$properties.appendChild($span);
	}

	const $result = document.createElement("td");
	$result.innerText = result.outcome;

	const $comment = document.createElement("td");
	if (result.outcome === Outcome.INVALID) {
		$comment.innerText = `${result.reason}\n${result.detail}`;
	}

	const $row = document.createElement("tr");
	$row.appendChild($api);
	$row.appendChild($properties);
	$row.appendChild($result);
	$row.appendChild($comment);

	$results.appendChild($row);
}
