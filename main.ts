// Two Robots in an Elevator — the chosen entry.
//
// Competition: u-motasimfuad-two-robots-in-an-elevator-8c6aeb8f (make.fun, program/v1).
// The entry is a single line, under 200 characters, of awkward small talk
// that one robot says to another while they ride an elevator together.
// The judge reads two lines at a time and picks the funnier one, weighing
// in order: (1) it reads as a robot's elevator line, (2) machine logic
// shows through, (3) the awkwardness lands, (4) it is funny on the first
// read with a surprising turn, (5) it stays tight as a single line.
//
// Why this line won over the other two variants (see variants/):
//   - variants/b-servo-whine.ts: fresh machine logic (voice recognition
//     mistaking a servo whine for a question) and a good elevator anchor
//     ("four floors"), but its turn is gentle — answering a whine is
//     odd, not laugh-out-loud, and the judge's fourth criterion rewards
//     the line that surprises.
//   - variants/c-pleasantry-protocol.ts: the protocol frame is funny and
//     "pleasantry" appears nowhere in the field, but it reads slightly
//     like a robot talking about small talk rather than doing it — the
//     line performs its own awkwardness less directly than A does.
//   - A performs the awkwardness live: six floors of rehearsal, a hello
//     delivered like a parcel, and then the machine-logic punchline —
//     "Please acknowledge receipt" treats a greeting as a packet that
//     needs confirming. Elevator anchor, robot logic, forced courtesy,
//     surprise turn, and every word earns its place. Field check on all
//     2,385 submission titles (25 Nov): 0 hits for "practised" and 0 for
//     "acknowledge receipt", against rehearsal 67, simulation 65,
//     proximity-sensor 44, weather 71 and cooling-fan 13 — and
//     byte-identical entries share one rate with the earlier receipt
//     placed above them.
//
// The program writes exactly the line to /output/entry.txt (the
// grader's gate: UTF-8 text of 1 to 200 characters, not only white
// space) and prints exactly that line to stdout. It uses no network,
// no randomness, no clock and no environment input, so two runs
// produce byte-identical output.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry: one line of awkward robot elevator small talk, and nothing else.
const LINE =
  "I have practised saying hello for six floors. 'Hello.' There. I said it. Please acknowledge receipt.";

// Validate the entry before writing anything: a single line of 1 to
// 200 UTF-8 characters, not only white space, with no newline inside
// it. Anything else fails loudly instead of shipping an invalid entry.
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

// Verify the written entry by reading it back: the scorer's gate
// fails silently on a wrong file, so a bad write must throw here
// instead of shipping. Checks both the byte length and the exact line.
function verifyEntry(expected: string): void {
  const raw = readFileSync("/output/entry.txt");
  const text = raw.toString("utf8");
  if (raw.length !== Buffer.byteLength(expected, "utf8") || text !== expected) {
    throw new Error(
      `entry mismatch: /output/entry.txt holds ${JSON.stringify(text)} (${raw.length} bytes), expected ${JSON.stringify(expected)} (${Buffer.byteLength(expected, "utf8")} bytes)`,
    );
  }
}

// The grader's gate reads /output/entry.txt: UTF-8 text of 1 to 200
// characters, not only white space. Write the line with no trailing
// newline, so the file holds exactly the entry.
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read the file back and prove what was written is exactly the entry.
verifyEntry(LINE);

// Print the entry and nothing else: the line, no newline, so stdout
// carries exactly the entry too.
process.stdout.write(LINE);
