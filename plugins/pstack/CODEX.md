# Codex runtime contract

Read this file before using a pstack workflow. Resolve the plugin root from the absolute path of the loaded skill: `skills/<name>/SKILL.md` is two directories below it. Resolve bundled files relative to that root, never relative to the target repository. No plugin-root environment variable is supplied automatically.

## Fork orchestration policy

This file is the fork's only workflow customization. Its orchestration rules take precedence over conflicting defaults, model tables, model-family diversity requirements, and instructions for effort adjustments, speed, fallbacks, execution tools, and isolation in skills, prompts, playbooks, templates, and guides. Explicit user instructions and valid user role overrides remain authoritative.

Use the defaults below when a role is absent from `~/.codex/pstack-models.md`, including when `setup-pstack` creates that file. On a setup rerun, preserve each configured model and effort unless the user explicitly requests a budget or assignment change. The setup skill's step 4 table mirrors these defaults; if they drift, this table wins.

| Role | Default assignment |
|---|---|
| feature, refactoring | claude-opus-5-5 @ high |
| bug-fix | claude-opus-5-5 @ high |
| perf-issue | claude-opus-5-5 @ high |
| hillclimb | claude-opus-5-5 @ high |
| judgment and prose | claude-opus-5-5 @ high |
| hardest tasks | gpt-6-astra @ xhigh |
| how explorer | claude-opus-5-5 @ high |
| how explainer | claude-opus-5-5 @ high |
| why investigators | claude-opus-5-5 @ high |
| why synthesizer | claude-opus-5-5 @ high |
| reflect tooling | claude-opus-5-5 @ high |
| reflect judgment, divergent, synthesizer | claude-opus-5-5 @ high |
| arena runners | gpt-6.1-sol @ xhigh, claude-opus-5-5 @ high |
| arena cross-judge pool | gpt-6-astra @ xhigh |
| swarm workers | claude-opus-5-5 @ high |
| architect runners | claude-opus-5-5 @ high |
| interrogate reviewers | claude-opus-5-5 @ high |

These defaults are a cross-provider preset: the coordinator stays in Codex and the `claude-opus-5-5` roles run through T3 Code (see [T3 Code routing](#t3-code-routing)). Architect still produces at least two structurally distinct candidates using its assigned model; the candidates do not require different model families. Arena keeps both configured runner entries in order. Conditional judgment/review selection follows the policy below.

Use fresh child contexts (`fork_turns: "none"`) with minimal explicit briefs. Codex children never delegate further. A Claude child delegated through T3 may delegate only when its brief explicitly assigns that nested work; otherwise it does the work itself. Never create a worktree without explicit user authorization. Use separate file ownership or serialize writes when sharing a checkout. Ask for permission before computer use.

## Delegation and models

Read `~/.codex/pstack-models.md` before delegating. Each entry is `model @ effort`; split those into the execution tool's separate model and reasoning fields. A missing role uses the fork default table above, not a conflicting skill default. `auto` and `inherit-parent` omit both overrides. Validate against the tool that will actually run the child. If a provider, model or effort is unavailable, stop the affected delegation and report it. Do not substitute another model or inherit the parent unless the user explicitly authorizes that choice.

Availability is specific to the execution tool: a model shown in a picker or another harness is not necessarily accepted by `spawn_agent`. Use only the model and effort values exposed by the tool that will run the child. Another harness requires an explicitly available delegation tool; changing a model string does not select that harness.

Keep each role's configured effort unless the user requests a change. Do not set fast-mode or priority-tier options by policy; use them only when the user asks, through a real field exposed by that tool, and never manufacture a `-fast` model name. If a requested adjustment is unavailable or rejected, report the limitation before running the child.

### T3 Code routing

Native `spawn_agent` runs only Codex models; it cannot spawn Claude. Claude roles need T3 Code's `delegate_task`. In standalone Codex without that tool, report that those roles have no supported route instead of renaming the model or pretending a native spawn ran Claude.

- Call `orchestrator_capabilities` once per thread before the first `delegate_task`, and again only after a delegation error or a user-named provider change. Validate the provider, model and option values it returns.
- Claude roles: `delegate_task` with `target.providerInstanceId: "claudeAgent"`, `target.model` set to the role's model (for Opus 5.5, `"claude-opus-5-5"`) and `target.options.effort` set to the role's effort.
- Codex roles: use native `spawn_agent` from a Codex parent when it exposes the model, needs no extra user-requested settings, and finishes in the current turn. Otherwise use `delegate_task` with `target.providerInstanceId: "codex"`, the role's model and `target.options.reasoningEffort`.
- A T3 child receives only its `task`, not parent history. Make the brief self-contained: absolute paths, scope, findings and the instruction files to read.
- Follow the `next` that `delegate_task` returns. Never poll a running delegate with status loops, sleeps or watchers.
- Each new review round is a new `delegate_task` with the brief, prior findings and objections. Never use `t3_thread_send` or top-level threads (`t3_thread_launch`, `create_threads`) for delegated review.

### Model selection

The conditional roles are `judgment and prose`, `reflect judgment, divergent, synthesizer`, and `interrogate reviewers`. Normally use the named role's assignment, default `claude-opus-5-5 @ high`. For genuinely difficult work, use the `hardest tasks` assignment instead, default `gpt-6-astra @ xhigh`. State the concrete difficulty, such as cross-cutting design, concurrency, or a subtle algorithm; being a review is not enough. Select one model for each invocation of these roles, never both, and keep the selected assignment's effort. Existing Reflect lenses are separate tasks, not an excuse to add model copies.

This conditional selection takes precedence over preserving the original model family or preferring a different family from the coordinator. Do not add reviewers for diversity. An explicit user selection or selection policy takes precedence over these defaults. Resolve the effective role before applying its configured value, inheritance alias and execution-tool validation; aliases still omit both overrides.

Arena's judge uses the first entry in `arena cross-judge pool`, default `gpt-6-astra @ xhigh`; it is not a conditional role. If that entry is unavailable, report it and stop the judge step rather than silently choosing another entry. Arena runners default to Sol 6.1 at xhigh plus Opus 5.5 at high and run both. Architect runners default to Opus 5.5 at high; multiple structural candidates can use that same model. Other roles retain their configured families and list entries.

Use the exposed collaboration tools to spawn, message, follow up, and wait; T3 delegates follow the routing rules above. Spawns are asynchronous. Do not pass Cursor parameters such as environment, cloud_base_branch, readonly, or run_in_background. Use `fork_turns: "none"` for every child, including when applying model overrides. Pass an absolute instruction-file path and a bounded task. Panels larger than available capacity run in waves; preserve every requested panel entry. Give concurrent writers separate file ownership. Serialize overlapping edits or use an isolated checkout only when authorized, passing its exact working directory and branch. A Codex child does not automatically get a cloud VM or isolated checkout.

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

Store orchestration state under a user-approved project location, default `<repo>/.codex/pstack-runs/<run-name>/`. Keep `notes.md` there with goals, owners, branches, head SHAs, evidence and pending decisions. Use the host's project tracker/store when available and supply the explicit absolute state path in worker briefs. Orchestrate no longer uses the removed `orch` CLI, `ORCH_STORE` or `--store`. Never assume an agent store appears in the system prompt. On restart, read the notes, inspect current branch/PR state, and recreate workers; old agent ids are not durable worker handles.

## Mode and discovery

Codex does not implement Cursor's mode/reminder metadata. A request to use poteto-mode throughout a task is a standing user instruction for that task: re-read the skill on relevant follow-ups and record it in the resume capsule. Do not claim automatic activation in unrelated tasks. Explicit-only leaf skills are read directly by the routing skill when needed.

For user-requested persistence across tasks, use the optional
[AGENTS.md method](docs/standing-mode.md) at the scope the user names. Preserve
existing instructions; never activate it or edit instructions merely on installation.

## Integrations

Discover available apps and MCP tools from the active tool map. Pstack bundles no external MCP server. UI verification uses the available browser/computer-use skill; CLI verification uses terminal tools. Report unavailable real-surface verification honestly.

Benny remains dormant until configured for a target repository, channel, tracker, and cadence. Its Codex adapter uses scheduled polling and the bundled `automations/benny/scripts/ledger.mjs` for durable state; it does not reproduce Cursor's event webhook latency. Read `automations/benny/POLLING.md` before using it. Make-bot-ui includes a loopback-only HTTP-to-Codex bridge with fixed summarize/dry-run operations; read that skill before starting or adapting it. Other operations need a reviewed fixed workflow or an existing supported endpoint. Neither integration is activated by plugin installation.
