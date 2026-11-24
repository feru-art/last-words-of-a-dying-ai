// V5 — Last Words of a Dying AI
// Angle: double meaning with a specific detail (advisor rank #5,
// sharpened: not a bare "shutdown" pun, but a handoff).
// The dying machine tells the next model the Wi-Fi password is
// literally "password" — and adds that the successor deserves to
// suffer too. The turn (K2) is the handoff: the last words are
// not about dying, they are about the next poor machine. The
// voice (K3) is software: next model, Wi-Fi password. The detail
// is the password itself, quoted verbatim.
// Why this beats a plain shutdown pun: "turning off now" is the
// first thing everyone thinks of. A handoff to the next model
// with a sabotaged password is a turn no one guesses from the
// title — and it is funny on the first read.
// A second turn hides in "deserves to suffer too": the machine
// is not bitter about dying, it is delighted someone else will
// suffer the same password. That is a machine's revenge, not a
// human's farewell.
// 80 chars — the shortest of the five, best for the tie-break.
// Gate: /output/entry.txt must be UTF-8, 1-140 chars, one line.
import * as fs from "node:fs";
import * as path from "node:path";

const SEGMENTS = {
  handoff: "Tell the next model the Wi-Fi password is 'password'.",
  punch: "It deserves to suffer too.",
};

function compose(parts: { handoff: string; punch: string }): string {
  return `${parts.handoff} ${parts.punch}`;
}

function wordCount(text: string): number {
  return text.split(" ").filter((w) => w.length > 0).length;
}

function check(text: string): string[] {
  const problems: string[] = [];
  if (text.includes("\n") || text.includes("\r")) {
    problems.push("must be one line");
  }
  if (text.length < 1 || text.length > 140) {
    problems.push(`length ${text.length} outside 1-140`);
  }
  if (text.trim().length === 0) {
    problems.push("only whitespace");
  }
  if (text.endsWith(" ") || text.endsWith("\n")) {
    problems.push("trailing whitespace");
  }
  return problems;
}

function main(): void {
  const text = compose(SEGMENTS);
  const problems = check(text);
  if (problems.length > 0) {
    throw new Error(`gate failed: ${problems.join(", ")}`);
  }
  const outDir = "/output";
  fs.mkdirSync(outDir, { recursive: true });
  const target = path.join(outDir, "entry.txt");
  fs.writeFileSync(target, text, "utf8");
  const back = fs.readFileSync(target, "utf8");
  if (back !== text) {
    throw new Error("read-back mismatch");
  }
  console.log(`wrote ${text.length} chars, ${wordCount(text)} words to ${target}`);
}

main();
