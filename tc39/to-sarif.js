import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as process from "node:process";

const sarifFileBase = {
    version: "2.1.0",
    "$schema": "http://json.schemastore.org/sarif-2.1.0",
};

const ruleIdPrototypeAccess = 1;

const toolInfoSarif = {
    driver: {
        name: "pp-runtime-gadgets",
        version: "0.1.0",
        rules: [
            {
                id: ruleIdPrototypeAccess,
                name: "Access to property in prototype",
                shortDescription: {
                    text: "The code accessed a property that was missing from the object and hence looked up in the object's prototype",
                }
            },
        ],
    },
};

function toSarif(data) {
    return {
        ...sarifFileBase,
        runs: [allToResults(data)],
    };
}

function allToResults(data) {
    return {
        tool: toolInfoSarif,
        results: [
            ...Object.entries(data)
                .map(([filename, findings]) => ({ filename, findings }))
                .flatMap(fileToResult),
        ],
    }
}

function fileToResult({ filename, findings }) {
    const byProperty = findings.reduce(groupBy("property"), new Map());
    return Array.from(byProperty.entries())
        .map(([property, findings]) => ({ filename, findings, property }))
        .map(propertyToResult);
}

function propertyToResult({ filename, findings, property }) {
    return {
        level: "error",
        ruleId: ruleIdPrototypeAccess,
        message: {
            text: `Detected access to '${property}' in the prototype`,
        },
        stacks: findings.map((finding, i) => ({
            message: {
                text: `stack ${i}`,
            },
            frames: finding.stack
                // Get stack frames
                .split(/\n/g)
                // Parse stack frame
                .map(line => /^\s+at .+? \((?<file>.+?):(?<line>\d+):(?<column>\d+)\)$/.exec(line))
                // Ignore frames that don't match
                .filter(line => line !== null)
                // Ignore frames in the temporary directory
                .filter(line => !line.groups.file.startsWith("/tmp"))
                // Map the frame to a SARIF location object
                .map(match => ({
                    location: {
                        physicalLocation: {
                            artifactLocation: {
                                uri: match.groups.file.startsWith("node:")
                                    ? match.groups.file
                                    : `test262/${match.groups.file}`,
                            },
                            region: {
                                startLine: parseInt(match.groups.line, 10),
                                startColumn: parseInt(match.groups.column, 10),
                            },
                        },
                    }
                })),
        })),
        locations: [
            {
                physicalLocation: {
                    artifactLocation: {
                        uri: `test262/${filename}`,
                    },
                },
            }
        ]
    };
}

function groupBy(property) {
    return (acc, finding) => {
        const findingsForProperty = acc.get(finding.property) || [];
        findingsForProperty.push(finding);
        acc.set(finding[property], findingsForProperty);
        return acc;
    };
}

// -----------------------------------------------------------------------------

const fromFile = process.argv[2];
const fromFilepath = path.resolve(".", fromFile);
const toFile = process.argv[3];
const toFilepath = path.resolve(".", toFile);

try {
    const json = await fs.readFile(fromFilepath, { encoding: "utf-8" });
    const object = JSON.parse(json);

    const sarif = toSarif(object);
    await fs.writeFile(toFilepath, JSON.stringify(sarif));
} catch (error) {
    console.log(`error for ${fromFile}:`, error.message);
    console.log();
    console.log(error);
}
