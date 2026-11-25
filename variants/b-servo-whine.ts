// Variant B — runner-up.
//
// "My voice recognition keeps classifying your servo whine as a question.
// I have been answering it for four floors." (112 characters)
//
// Fresh machine logic: a voice-recognition module mistaking a servo
// whine for a question, and a robot too polite to stop answering it.
// Elevator anchor ("four floors"), awkwardness (four floors of
// answering a noise), and a turn that reframes the whole ride. Ranked
// second because the turn is gentle — answering a whine is odd rather
// than laugh-out-loud — where the judge's fourth criterion rewards the
// line that surprises. "Whine" appears in no entry of a 2,385-entry
// field sample, so the angle is original.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line of awkward robot elevator small talk, and nothing else.
const LINE =
  "My voice recognition keeps classifying your servo whine as a question. I have been answering it for four floors.";

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
