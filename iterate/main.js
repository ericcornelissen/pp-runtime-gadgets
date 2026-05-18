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

const queue = [{ parent: null, subject: globalThis }];
const finished = new Set();
const findings = [];
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
		const value = subject[key];
		queue.push({ parent: entry, subject: value });

		if (typeof value === "function") {
			const { probe, observations } = newProbe();
			try {
				value(probe);
			} catch {
				// nothing to do
			} finally {
				const obs = observations();
				if (obs.length > 0) {
					findings.push(...obs.map(observation => ({ key, ...observation, path: entry })));
				}
			}
		}
	}
}

console.log(findings);
process.exit(0);
