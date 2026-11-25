// Variant A — CHOSEN (also the root main.ts).
//
// "I have practised saying hello for six floors. 'Hello.' There. I said
// it. Please acknowledge receipt." (100 characters)
//
// The line performs its awkwardness live: six floors of rehearsal, a
// hello delivered like a parcel, then the machine-logic punchline —
// "Please acknowledge receipt" treats a greeting as a packet needing
// confirmation. Elevator anchor (six floors), robot logic (rehearsed
// greeting, receipt confirmation), forced courtesy ("There. I said
// it."), surprise turn, every word earning its place. In a 2,385-entry
// sample of the field, no entry uses "practised" or "acknowledge
// receipt", while rehearsal, simulation, proximity-sensor, weather and
// cooling-fan lines are all heavily copied.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line of awkward robot elevator small talk, and nothing else.
const LINE =
  "I have practised saying hello for six floors. 'Hello.' There. I said it. Please acknowledge receipt.";

if (
  LINE.length < 1 ||
  LINE.length > 200 ||
  Buffer.byteLength(LINE, "utf8") > 200 ||
  LINE.trim().length === 0 ||
  LINE.includes("\n")
) {
  throw new Error(
    `invalid entry ${JSON.stringify(LINE)}: must be one line of 1-200 characters`,
  );
}

function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)} (${Buffer.byteLength(expected, "utf8")} bytes)`,
    );
  }
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
verifyEntry(LINE);
process.stdout.write(LINE);
