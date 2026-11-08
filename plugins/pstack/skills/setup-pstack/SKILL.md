---
name: setup-pstack
description: Configure the models and reasoning efforts pstack uses for delegation roles, including Claude roles routed through T3 Code. Use for setup-pstack, pstack model configuration, or changing pstack's budget.
---

Before following this workflow, read [the Codex runtime contract](../../CODEX.md). It defines plugin paths, model configuration, delegation, and persistence.

# Setup pstack for Codex

Write `~/.codex/pstack-models.md`, the override file every delegating pstack skill reads before it spawns subagents. Missing roles keep the fork defaults in CODEX.md, shown in step 4. This file is configuration for pstack, not a Codex model-provider configuration file.

## 1. Load current state

Read the existing override file when present, preserving every configured role value. Otherwise start from the defaults in step 4. Drop retired roles absent from step 4 (for example `how critics`) and list each dropped line when showing the proposed configuration. Never invent a model slug. `inherit-parent` and `auto` are always valid and both mean to omit the model override.

Validate each role against the tool that will run it, as routed in CODEX.md. Codex roles use the model and effort choices of `spawn_agent`, or of T3's `delegate_task` when routed there. Claude roles are valid only where `orchestrator_capabilities` lists the model and effort under `claudeAgent`. A picker entry or a model available through another harness does not establish that it can run here. If routes or capabilities are missing, report the affected roles together and stop before writing. Leave any existing file intact until the route becomes available or the user authorizes a repair.

## 2. Choose a budget

Use the available user-input tool, or ask one concise question. Name the current budget when the file records one. Offer `keep current — per-role efforts` first, as the default: it keeps every configured model and effort, including custom mixed efforts, or the per-role efforts in step 4 when there is no configuration. The `# budget:` line is a label, never an instruction to rewrite efforts; label nonuniform efforts `mixed (per-role)`. Also offer:

- `unlimited — max reasoning`: each model's highest host-supported effort, up to `max`.
- `large — xhigh reasoning`: `xhigh`.
- `medium — high reasoning`: `high`.
- `small — medium reasoning`: `medium`.

Apply an explicitly selected uniform effort to every real model, including panel entries. Preserve existing model choices, list order, and inheritance aliases; aliases keep both overrides unset. Model and effort are separate fields. For `unlimited`, select the highest supported effort up to `max`. For the other budgets, if any model cannot support the requested effort, report it and resolve that choice before writing. Do not lower the effort or change the model without the user's authorization.

## 3. Confirm role assignments

Show every role, model, and reasoning effort. Allow `inherit-parent` or `auto` for any role. Panel roles are ordered lists; one subagent runs per list entry. List length controls panel size. `arena cross-judge pool` is also a list, but Arena runs one judge: it tries values in list order, so order it by preference. An `inherit-parent` or `auto` value never judges. Preserve configured model and effort values unless the user requests a change; report unavailable assignments rather than silently rewriting them.

If the user asks to repair unavailable assignments, choose replacements from the execution tool's available models using their advertised strengths and the role's purpose. Preserve valid assignments, the budget, and panel order and size; report each replacement. That request authorizes updating the file without another confirmation. Otherwise ask about unavailable choices before writing.

## 4. Write the override

Overwrite `~/.codex/pstack-models.md` atomically so reruns are idempotent. Use this shape:

```text
# pstack model configuration for Codex. Delete a role line to use its skill default.
# `inherit-parent` or `auto` omits explicit model and reasoning overrides.
# budget: mixed (per-role)
# Use `delegate_task` with `claudeAgent` for Opus 5.5, preserving each role’s configured effort.
feature, refactoring: claude-opus-5-5 @ high
bug-fix: claude-opus-5-5 @ high
perf-issue: claude-opus-5-5 @ high
hillclimb: claude-opus-5-5 @ high
judgment and prose: claude-opus-5-5 @ high
hardest tasks: gpt-6-astra @ xhigh
how explorer: claude-opus-5-5 @ high
how explainer: claude-opus-5-5 @ high
why investigators: claude-opus-5-5 @ high
why synthesizer: claude-opus-5-5 @ high
reflect tooling: claude-opus-5-5 @ high
reflect judgment, divergent, synthesizer: claude-opus-5-5 @ high
arena runners: gpt-6.1-sol @ xhigh, claude-opus-5-5 @ high
arena cross-judge pool: gpt-6-astra @ xhigh
swarm workers: claude-opus-5-5 @ high
architect runners: claude-opus-5-5 @ high
interrogate reviewers: claude-opus-5-5 @ high
```

Keep the `delegate_task` comment line whenever any role uses a Claude model. Apply only an explicitly selected uniform budget to the effort values before writing. Validate every real model and its effort against the execution tool's available choices. Resolve unavailable assignments as described in step 3; do not write a slug the tool cannot accept.

## 5. Install or refresh custom agents

Locate this installed plugin's root. Copy `codex-agents/poteto-agent.toml` and `codex-agents/comment-sicko.toml` into `~/.codex/agents/`, replacing only those two pstack-owned files. Do not alter unrelated agents. Tell the user that new Codex sessions pick them up.

## 6. Confirm

Report the chosen budget, overrides, config path, and installed agent files. Re-running this skill updates the same files.

Optionally offer `$create-verification-skill` when the repository has no real-surface test harness. Also offer `$create-formal-verification-skill` once when the project has no formal verification skill: it checks a key property with a model checker, proof, or code-level verifier under explicit bounds. If the user declines either offer, move on.

If the user wants poteto-mode to persist across tasks, use the optional
[AGENTS.md method](../../docs/standing-mode.md) at the scope they choose. Do not
alter instructions unless that persistence was requested.
