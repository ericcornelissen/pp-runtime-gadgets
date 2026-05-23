// SPDX-License-Identifier: BlueOak-1.0.0

import { asManyKeysAsPossible } from "./keys.js";

function newProbe() {
	const observations = [];
	return {
		observations: () => observations,
		probe: new Proxy({}, {
			get(target, property, _receiver) {
				if (Object.getPrototypeOf(target) !== null) {
					const allowlist = [
						Symbol.isConcatSpreadable,
						Symbol.iterator,
						Symbol.match,
						Symbol.replace,
						Symbol.search,
						Symbol.species,
						Symbol.split,
						Symbol.toPrimitive,
						Symbol.toStringTag,
					];

					let found = false, obj = target;
					while (obj !== null) {
						if (Object.hasOwn(obj, property)) {
							found = true;
							break;
						}

						obj = Object.getPrototypeOf(obj);
					}

					if (!found && !allowlist.includes(property)) {
						try {
							throw new Error();
						} catch (error) {
							observations.push({
								property,
								stack: error.stack.replace(/\\n/g, '\\\\n'),
							});
						}
					}
				}

				return target[property];
			},
		}),
	};
}

const queue = [{ parent: null, key: "globalThis", subject: globalThis }];
const finished = new Set();
while (queue.length > 0) {
	const entry = queue.pop();
	const { subject } = entry;

	if (finished.has(subject)) {
		continue;
	} else {
		finished.add(subject);
	}

	const keys = asManyKeysAsPossible(subject);
	for (const key of keys) {
		if (globalThis.process && subject === globalThis.Storage && key === "prototype") continue;

		try {
			const value = await subject[key];
			queue.push({ parent: entry, key, subject: value });

			const path = [key];
			let cur = { parent: entry };
			while ((cur = cur.parent) !== null) {
				path.push(cur.key);
			}
			path.reverse();

			if (typeof value === "function") {
				const { probe, observations } = newProbe();
				try {
					value(probe);
				} catch {
					// nothing to do
				} finally {
					for (const observation of observations()) {
						console.debug("Observation:", {
							path: path.join("."),
							observation,
						});
					}
				}
			}
		} catch (error) {
			console.warn(error);
		}
	}
}
