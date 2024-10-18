import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";

import * as acorn from "acorn";
import * as estraverse from "estraverse";

function createProxyCode(obj) {
	return `new Proxy(%s, {
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
						console.log("LOOKUP", "|", "PROPERTY:", property, "|", "STACK:", error.stack.replace(/\\n/g, '\\\\n'));
					}
				}
			}

			return target[property];
		}
	})`.replace(/\n\s*/gm, "").replace("%s", obj);
}

function transform(source) {
	const ast = acorn.parse(source, {
		ecmaVersion: 2022,
		ranges: true,
	});

	const objects = [];
	estraverse.replace(ast, {
		enter: (node) => {
			switch (node.type) {
			case "ArrayExpression":
			case "ObjectExpression":
				objects.push({
					start: node.range[0],
					end: node.range[1],
				});
				break;
			}
		}
	});

	objects
		.sort((a, b) => b.end - a.end)
		.filter((a, _i, arr) => !arr.some(b => a.start > b.start && a.start < b.end))
		.forEach((meta) => {
			const pre = source.slice(0, meta.start);
			const obj = source.slice(meta.start, meta.end);
			const post = source.slice(meta.end, /* end */);
			source = pre + createProxyCode(obj) + post;
		});

	return source;
}

// -----------------------------------------------------------------------------

const file = process.argv[2];
const filepath = path.resolve(".", file);
try {
	await fs.access(filepath, fs.constants.R_OK | fs.constants.W_OK);
	const code = await fs.readFile(filepath, { encoding: "utf-8" });
	const transformed = transform(code);
	await fs.writeFile(filepath, transformed);
	console.log(`Rewrote ${file}`);
} catch (error) {
	console.log(`error for ${file}:`, error.message);
	console.log(error);
}
