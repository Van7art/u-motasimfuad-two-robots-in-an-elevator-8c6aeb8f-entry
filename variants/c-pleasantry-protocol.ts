// Variant C — third.
//
// "My small-talk protocol requires one pleasantry per ride. This is it.
// Protocol satisfied. We never have to do this again." (120 characters)
//
// The protocol frame is funny — small talk as a compliance checklist —
// and "pleasantry" appears in no entry of a 2,385-entry field sample.
// Elevator anchor ("per ride"), machine logic (protocol, satisfied),
// awkwardness (a pleasantry delivered as paperwork), and a closing
// turn that bans any repeat. Ranked third because it reads slightly
// like a robot talking about small talk rather than doing it: the line
// performs its own awkwardness less directly than variant A, where the
// hello itself is the awkward event.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line of awkward robot elevator small talk, and nothing else.
const LINE =
  "My small-talk protocol requires one pleasantry per ride. This is it. Protocol satisfied. We never have to do this again.";

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
