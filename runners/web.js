import { all, Outcome } from "./base.js";

const $results = document.getElementById("results");
for (const { about, result } of all()) {
	const $api = document.createElement("td");
	$api.innerText = about.function;

	const $properties = document.createElement("td");
	$properties.innerText = about.properties.join(",");

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
