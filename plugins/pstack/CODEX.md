# Codex runtime contract

Read this file before using a pstack workflow. Resolve the plugin root from the absolute path of the loaded skill: `skills/<name>/SKILL.md` is two directories below it. Resolve bundled files relative to that root, never relative to the target repository. No plugin-root environment variable is supplied automatically.

## Delegation and models

Read `~/.codex/pstack-models.md` before delegating. Each entry is `model @ effort`; split those into the host's separate model and reasoning fields. A missing role uses its skill default. `auto` and `inherit-parent` omit both overrides. Validate against the active host's tool schema. Unavailable model choices must be reported; use inheritance as the explicit fallback rather than fabricate a model.

Availability is specific to the execution tool: a model shown in a picker or another harness is not necessarily accepted by `spawn_agent`. Use only the model and effort values exposed by the tool that will run the child. Another harness requires an explicitly available delegation tool; changing a model string does not select that harness.

Role efforts are starting levels except where the selection policy below keeps the selected assignment. Apply per-job adjustments through the execution tool's supported reasoning field. Speed changes require a real field exposed by that tool; never manufacture a `-fast` model name. If a requested adjustment is unavailable or rejected, retain the valid configured assignment and report the limitation.

### Model selection

The conditional roles are `judgment and prose`, `reflect judgment, divergent, synthesizer`, `arena cross-judge pool`, and `interrogate reviewers`. Normally use the named role's assignment, default `gpt-6.1-sol @ xhigh`. For genuinely difficult work, use the `hardest tasks` assignment instead, default `gpt-6-astra @ xhigh`. State the concrete difficulty, such as cross-cutting design, concurrency, or a subtle algorithm; being a review is not enough. Select one model for each invocation of these roles, never both, and keep the selected assignment's effort. Existing Reflect lenses are separate tasks, not an excuse to add model copies.

This conditional selection takes precedence over preserving the original model family or preferring a different family from the coordinator. Do not add reviewers for diversity. An explicit user selection or selection policy takes precedence over these defaults. Resolve the effective role before applying its configured value, inheritance alias and execution-tool validation; aliases still omit both overrides.

Code and Swarm default to Sol 6.1 at medium reasoning. How, Why and tooling default to Sol 6.1. Arena runners default to Astra 6 plus Sol 6.1 and run both. Architect runners default to Sol 6.1 at xhigh reasoning; multiple structural candidates can use that same model. Other roles retain their configured families and list entries.

Use the exposed collaboration tools to spawn, message, follow up, and wait. Spawns are asynchronous. Do not pass Cursor parameters such as environment, cloud_base_branch, readonly, or run_in_background. With a model override, use a fresh or bounded context fork if the host requires it. Pass an absolute instruction-file path and a bounded task. Panels larger than available capacity run in waves; preserve every requested panel entry. Give concurrent writers separate file ownership. Serialize overlapping edits or use an isolated checkout only when authorized, passing its exact working directory and branch. A Codex child does not automatically get a cloud VM or isolated checkout.

When `fork_turns: "all"` forbids model or effort overrides, use `fork_turns: "none"` with the configured overrides and put the required context and findings in the task prompt. This is a context constraint, not an unavailable model; do not silently inherit the parent model to retain full history.

For the poteto-agent persona, pass the absolute path to `agents/poteto-agent.md`. For Comment Sicko, pass `agents/comment-sicko.md`. Use named custom agents only if the current spawn schema exposes them. Read-only reviewers receive explicit no-write instructions; permissions and available MCP tools come from the host. Custom agent files omit model settings so role choices can take effect.

Do not treat a persona's no-write instructions or `sandbox_mode` default as an
independent security boundary: live parent permission overrides can be inherited
by children. For a separately sandboxed review, use a fresh `codex exec
--sandbox read-only` process and verify the actual permissions on that host.
Read-only limits writes; it does not by itself prevent reading sensitive files.

## Continuing work

For scheduled monitoring and follow-ups, use the supported Codex automation tool and its current schema. Use a heartbeat for the current task; create a standalone scheduled project task only when requested. Record the predicate, state-file paths, scope, and notification conditions. Stay quiet on unchanged state. Inspect existing automations before creating duplicates. Never emulate persistent wakeups with a detached sleeping shell.

When creating a current-task heartbeat, supply `destination: "thread"` (or a
verified target task id) if the host requires it. Confirm the create result and
saved state. A paused create/view/delete test proves configuration handling, not
timed execution; do not report a schedule as delivery-tested until it actually runs.

During an active turn, use bounded tool waits and recheck the predicate. If scheduling is unavailable, report that limitation and save a resume capsule; do not claim a future wake is armed. Create a goal only when the user explicitly requests one. Otherwise retain the objective in the task's durable notes.

Store orchestration state under a user-approved project location, default `<repo>/.codex/pstack-runs/<run-name>/`. Supply this absolute path through `ORCH_STORE` or `--store`. Never assume an agent store appears in the system prompt. On restart, read the ledger, inspect current branch/PR state, and recreate workers; old agent ids are not durable worker handles.

## Mode and discovery

Codex does not implement Cursor's mode/reminder metadata. A request to use poteto-mode throughout a task is a standing user instruction for that task: re-read the skill on relevant follow-ups and record it in the resume capsule. Do not claim automatic activation in unrelated tasks. Explicit-only leaf skills are read directly by the routing skill when needed.

For user-requested persistence across tasks in one repository, use the optional
[scoped AGENTS.md method](docs/standing-mode.md). Preserve existing instructions;
do not activate it globally or edit project instructions merely on installation.

## Integrations

Discover available apps and MCP tools from the active tool map. Pstack bundles no external MCP server. UI verification uses the available browser/computer-use skill; CLI verification uses terminal tools. Report unavailable real-surface verification honestly.

Benny remains dormant until configured for a target repository, channel, tracker, and cadence. Its Codex adapter uses scheduled polling and the bundled `automations/benny/scripts/ledger.mjs` for durable state; it does not reproduce Cursor's event webhook latency. Read `automations/benny/POLLING.md` before using it. Make-bot-ui includes a loopback-only HTTP-to-Codex bridge with fixed summarize/dry-run operations; read that skill before starting or adapting it. Other operations need a reviewed fixed workflow or an existing supported endpoint. Neither integration is activated by plugin installation.
