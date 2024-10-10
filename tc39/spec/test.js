import * as assert from "node:assert/strict";
import * as cp from "node:child_process";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { test } from "node:test";
import * as url from "node:url";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const cli = path.resolve(__dirname, "..", "rewriter.js");

for (const filename of await fs.readdir(__dirname)) {
  if (!filename.endsWith(".before.js")) {
    continue;
  }

  const testname = filename.replace(/\.before\.js$/, "");

  const beforePath = path.resolve(__dirname, filename);
  const afterPath = path.resolve(
    __dirname,
    filename.replace(/\.before\.js$/, ".after.js")
  );

  const original = await fs.readFile(beforePath, { encoding: "utf-8" });
  const expected = fs.readFile(afterPath, { encoding: "utf-8" });

  test(testname, async () => {
    cp.execSync(`node ${cli} ${beforePath}`);
    const actual = await fs.readFile(beforePath, { encoding: "utf-8" });

    await fs.writeFile(beforePath, original);
    assert.equal(actual, await expected);
  });
}
