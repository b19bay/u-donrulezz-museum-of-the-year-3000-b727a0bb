import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LABEL =
  "House key. A small metal password, carried on a ring with nine others, none of which its owner could name.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  console.error("MAKEFUN_OUTPUT_DIR is not set");
  process.exit(1);
}

if (LABEL.length < 1 || LABEL.length > 200) {
  console.error(`label is ${LABEL.length} characters, must be 1-200`);
  process.exit(1);
}
if (LABEL.trim().length === 0 || LABEL.includes("\n")) {
  console.error("label must be a single non-blank line");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LABEL, "utf8");
const readBack = readFileSync(outPath, "utf8");
if (readBack !== LABEL || readBack.length !== 106) {
  console.error("read-back mismatch: entry.txt is not byte-identical to the label");
  process.exit(1);
}
console.log(`wrote entry.txt (${LABEL.length} characters)`);
