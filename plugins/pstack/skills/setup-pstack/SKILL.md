---
name: setup-pstack
description: Configure the Codex models and reasoning efforts pstack uses for delegation roles. Use for setup-pstack, pstack model configuration, or changing pstack's budget.
---

Before following this workflow, read [the Codex runtime contract](../../CODEX.md). It defines plugin paths, model configuration, delegation, and persistence.

# Setup pstack for Codex

Write `~/.codex/pstack-models.md`, the override file every delegating pstack skill reads before it spawns subagents. Missing roles keep the defaults below. This file is configuration for pstack, not a Codex model-provider configuration file.

## 1. Load current state

Read the existing override file when present, preserving its budget, configured role values and selection-policy comments. Otherwise start from the defaults in step 4 and the model-selection policy in `CODEX.md`. Drop retired roles absent from step 4 (for example `how critics`) and list each dropped line when showing the proposed configuration. Determine which Codex models the current host exposes from the current tool metadata or official local model picker. Never invent a model slug. `inherit-parent` and `auto` are always valid and both mean to omit the model override.

For roles executed through `spawn_agent`, its model and effort choices are authoritative. A picker entry or a model available through another harness does not establish that it can be spawned here. Follow `CODEX.md` when an explicit model requires a fresh context fork.

## 2. Choose a budget

When a budget choice is missing, use the available user-input tool or ask one concise question. Preserve the current budget and per-role efforts on a rerun unless the user changes them. With no configuration, use the defaults below under `large`, including `medium` for code and Swarm. Offer:

- `unlimited — max reasoning`: each model's highest host-supported effort, up to `max`.
- `large — xhigh reasoning`: `xhigh`.
- `medium — high reasoning`: `high`.
- `small — medium reasoning`: `medium`.

When the user explicitly changes the budget, write its selected effort for each real model, including runner entries. Otherwise preserve existing per-role efforts or use the defaults below. An explicit per-role model or effort change updates only the requested roles. Routing follows `CODEX.md`: conditional judgment/review roles keep the selected assignment's effort; other roles may adjust effort through supported fields while preserving the configured family. Preserve existing model choices, list order, selection policy and inheritance aliases; aliases keep both overrides unset. Model and effort are separate fields in Codex. Use the highest supported effort at or below the requested target. If none is available, mark the role as needing a choice. Never change the model to satisfy a budget.

## 3. Confirm role assignments

Show every role, model, reasoning effort and selection policy. Allow `inherit-parent` or `auto` for any role. Arena runner lists run each entry; Architect can run multiple candidates with the same configured model. Conditional judgment/review roles choose one effective assignment per invocation, normally Sol 6.1 or `hardest tasks` for difficult work, as defined in `CODEX.md`. Do not add reviewers for family diversity. Keep a user's existing override unless it is unavailable.

If the user asks to repair unavailable assignments, choose replacements from the execution tool's available models using their advertised strengths and the role's purpose. Preserve valid assignments, the budget, and panel order and size; report each replacement. That request authorizes updating the file without another confirmation. Otherwise ask about unavailable choices before writing.

## 4. Write the override

Overwrite `~/.codex/pstack-models.md` atomically so reruns are idempotent. Use this shape:

```text
# pstack model configuration for Codex. Delete a role line to use its skill default.
# `inherit-parent` or `auto` omits explicit model and reasoning overrides.
# budget: large (xhigh)
# Code and Swarm use medium reasoning as explicit per-role defaults.
# Conditional judgment/review roles use their assignment normally and `hardest tasks`
# for concretely difficult work. Select one model, never both or extra diversity reviewers.
# Arena runners run both entries; Architect candidates use only its assigned model.
feature, refactoring: gpt-6.1-sol @ medium
bug-fix: gpt-6.1-sol @ medium
perf-issue: gpt-6.1-sol @ medium
hillclimb: gpt-6.1-sol @ medium
judgment and prose: gpt-6.1-sol @ xhigh
hardest tasks: gpt-6-astra @ xhigh
how explorer: gpt-6.1-sol @ xhigh
how explainer: gpt-6.1-sol @ xhigh
why investigators: gpt-6.1-sol @ xhigh
why synthesizer: gpt-6.1-sol @ xhigh
reflect tooling: gpt-6.1-sol @ xhigh
reflect judgment, divergent, synthesizer: gpt-6.1-sol @ xhigh
arena runners: gpt-6-astra @ xhigh, gpt-6.1-sol @ xhigh
arena cross-judge pool: gpt-6.1-sol @ xhigh
swarm workers: gpt-6.1-sol @ medium
architect runners: gpt-6.1-sol @ xhigh
interrogate reviewers: gpt-6.1-sol @ xhigh
```

Apply explicitly requested budget or role changes to the separate effort values before writing; otherwise preserve each role's current or default effort. Validate every real model and its effort against the execution tool's available choices. Resolve unavailable assignments as described in step 3; do not write a slug the tool cannot accept.

## 5. Install or refresh custom agents

Locate this installed plugin's root. Copy `codex-agents/poteto-agent.toml` and `codex-agents/comment-sicko.toml` into `~/.codex/agents/`, replacing only those two pstack-owned files. Do not alter unrelated agents. Tell the user that new Codex sessions pick them up.

## 6. Confirm

Report the chosen budget, overrides, config path, and installed agent files. Re-running this skill updates the same files.

Optionally offer to create a project-local verification skill when the repository has no real-surface test harness.

If the user wants poteto-mode to persist across tasks in this repository, use the
optional [scoped AGENTS.md method](../../docs/standing-mode.md). Do not alter
project instructions unless that persistence was requested.

## 7. Offer verification skills (optional)

Check whether the project has a real-surface verification skill or harness. If it has none, offer `$create-verification-skill` once; invoke it only when the user accepts.

Separately check for a project-local formal verification skill. If it has none, offer `$create-formal-verification-skill` once to verify a key property within stated bounds and assumptions. Invoke it only when the user accepts. Declining either offer does not block setup.
