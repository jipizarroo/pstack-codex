---
name: arena
description: "Spawn N parallel candidates at the same task, pick a base, graft the strongest parts of the losers into it. Use for $arena, 'arena this', 'throw it in the arena', or when one attempt at a non-trivial artifact would lock in the wrong shape."
---

Before following this workflow, read [the Codex runtime contract](../../CODEX.md). It defines plugin paths, model configuration, delegation, and persistence.

# Arena

Fan out parallel attempts, pick a base, graft the best ideas, and verify the result. Resolve role overrides through `CODEX.md` before each spawn.

Track Frame, Fan out, Cross-judge, Pick, Graft, and Verify before launching.

## Phase A: Frame

Every candidate gets the same prompt, so the prompt is the contract.

1. State the artifact each candidate is producing.
2. Derive the rubric. Derive 3-6 concrete gradeable criteria for success. The rubric is the picker's tool in Phase D. Candidates only see the task.
3. Pick the runners. Use `arena runners` from `~/.codex/pstack-models.md` when present. Otherwise use its default in CODEX.md. An `auto` or `inherit-parent` entry in this line means the parent model, so omit the overrides for it. If the spawn rejects a configured entry, drop that seat and say so. Replacing it on another model, another effort, or the parent model follows CODEX.md and needs the user's authorization. Spawn more when the arena covers multiple design directions. Same model N times when the work is generation-bound rather than judgment-sensitive. Pick reasoning effort for the job under the Subagents section of **poteto-mode**, using only the active execution tool’s supported values.
4. Assign output paths. Each candidate writes to its own location (a git worktree where possible, otherwise `/tmp/arena-<slug>/candidate-<n>/`), per the **separate-before-serializing-shared-state** principle skill.

## Phase B: Fan out

Spawn all N candidates asynchronously, in rolling waves bounded by the host's available capacity. Give each the task, the absolute path to the shared grounding, its own output path or worktree, and instructions to produce both the artifact and a short rationale.

If a candidate produces no output, proceed with N-1 and note the dropout.

## Phase C: Cross-judge

After all Phase B candidates complete, choose one model from the `arena cross-judge pool` in `~/.codex/pstack-models.md` when present. Otherwise use its default in CODEX.md. Spawn one read-only judge subagent. Try the pool's entries in pool order; the judge may share the parent's model family. An `auto` or `inherit-parent` entry is the parent model, so it never judges. If the spawn rejects an entry, say so and move to the next entry. If no entry runs, skip the judge, pick the base alone in Phase D, and say so. The judge sees the rubric and the candidates by path label, scores each criterion, and recommends a base with rationale. It runs in parallel with the parent's reading in Phase D, not with the candidates themselves. Don't spawn the judge while candidates are still writing.

## Phase D: Pick a base

Read every candidate end to end before picking. Score each against the rubric criterion by criterion, not on holistic feel, and compare with the cross-judge when Phase C ran one. Agreement on the base confirms the pick. Disagreement means one of you is biased or the rubric was ambiguous. Read both rationales before deciding.

Pick the base a future maintainer can extend most easily without breaking invariants. When two feel tied, prefer the cleaner boundary or smaller API, per the Laziness Protocol.

## Phase E: Graft

Walk each losing candidate once more for what is worth porting into the base, usually one or two things per candidate, not most of it. Fold each graft in by hand, per the **redesign-from-first-principles** principle skill, so the result stays coherent under one mental model. Don't paste mechanically.

If the candidates converge on one shape, that is strong agreement. Note it and ship the consensus shape. No graft is needed. If they wildly diverge, Phase A was under-specified. Reframe and re-run rather than averaging the divergence.

## Phase F: Verify

Verify the synthesized artifact like any other output, per the **prove-it-works** principle skill. If verification finds a problem the arena missed, either Phase A was wrong (re-frame and re-run) or a candidate caught it and you missed the graft (go back to Phase E). Don't paper over it.

## Outputs

One synthesized artifact, with a short synthesis note alongside naming the base and why, the cross-judge's verdict or that Phase C skipped the judge, each graft with its source candidate, what was rejected and why, any convergence or dropouts, and the verification result.
