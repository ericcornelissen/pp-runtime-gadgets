import { createReadStream } from "node:fs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";
import * as readline from "node:readline";

const TEST_RESULT_EXPR = /^(PASS|FAIL) /;
const LOOKED_UP_EXPR = /^\s*LOOKUP \| PROPERTY: (?<property>[^\s]+) \| STACK: (?<stack>[^\n]+)/;

async function analyze(stream) {
    const state = {
        current: null,
        lookups: new Map(),
    };

    const reader = readline.createInterface({ input: stream });
    for await (const line of reader) {
        if (line === "") {
            continue;
        }

        const testMatch = line.match(TEST_RESULT_EXPR);
        const lookupMatch = line.match(LOOKED_UP_EXPR);

        if (testMatch) {
            state.current = line
                .replace(TEST_RESULT_EXPR, "")
                .replace(" (default)", "")
                .replace(" (strict mode)", "");

            if (!state.lookups.has(state.current)) {
                state.lookups.set(state.current, new Set());
            }
        } else if (lookupMatch) {
            const property = lookupMatch.groups.property;
            const stack = lookupMatch.groups.stack
                .replace(/\\n/g, "\n")
                .replace(
                    /evalmachine\.<anonymous>:(\d+):(\d+)/,
                    (_, line, column) => `${state.current}:${parseInt(line, 10) - 147}:${column}`);

            const filepath = path.resolve(".", state.current);
            const content = await fs.readFile(filepath, { encoding: "utf-8" });
            if (
                content.includes(`.${property}`)
                ||
                content.includes(`[${property}]`)
            ) {
                continue;
            }

            const lookups = state.lookups.get(state.current);
            lookups.add({property, stack});
        }
    }

    const lookups = new Map();
    for (const key of state.lookups.keys()) {
        const properties = state.lookups.get(key);
        if (properties.size > 0) {
            lookups.set(key, Array.from(properties));
        }
    }

    return lookups;
}

// -----------------------------------------------------------------------------

const logFile = process.argv[2];
const logFilepath = path.resolve(".", logFile);
const outFile = process.argv[3];
const outFilepath = path.resolve(".", outFile);

try {
    const stream = createReadStream(logFilepath, { encoding: "utf-8" });
    const result = await analyze(stream);
    const object = Object.fromEntries(result.entries());
    const json = JSON.stringify(object);
    await fs.writeFile(outFilepath, json);
} catch (error) {
    console.log(`error for ${logFile}:`, error.message);
    console.log(error);
}
