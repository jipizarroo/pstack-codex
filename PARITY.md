# Port coverage and runtime boundaries

This is a workflow port, not an emulation of Cursor's runtime. All 573 files in
the pinned upstream snapshot have a retained, adapted, or explicitly replaced
counterpart. Run `python3 scripts/parity.py --report` for the per-file inventory.
File coverage alone does not prove behavioral equivalence.

| Upstream feature | Codex implementation | Boundary |
|---|---|---|
| 58 upstream skills, 2 Codex additions, and 23 playbooks | Native skills, relative resources, shared `CODEX.md` runtime contract | Invocation uses `$skill-name`; routed explicit-only skills are read directly |
| Engineering principles | All 24 principle skills retained | Applied when the routing workflow calls for them |
| poteto-agent and Comment Sicko | Bundled persona instructions; optional custom-agent TOML | Named-agent registration is optional, not automatic plugin discovery |
| Role-based models and panels | Host-validated model/effort preferences; inheritance fallback | Model availability and concurrent capacity depend on the host; panels run in waves |
| Parallel workers | Explicit worktrees and bounded Codex subagents | No automatic cloud VM, branch isolation, or durable worker ID |
| Sticky mode/reminders | Standing task instruction; optional scoped `AGENTS.md` for cross-task persistence | Opt-in per repository, not a Cursor UI-mode switch; see [method](plugins/pstack/docs/standing-mode.md) |
| Long-running goals and loops | Explicitly requested goals, supported heartbeat/project automations, durable ledgers | Requires scheduler availability; detached sleepers are not persistence |
| PR watching, orchestration, decision logs | Retained PR-watcher helpers; native agent coordination with explicit durable notes | Host subscriptions/tracker/store are optional; no cloud VM, nested delegation or durable worker ID is assumed |
| Transcript recall/worktree audit | Workspace-matched Codex session metadata | Unrelated session content is not searched to infer ownership |
| Browser/UI verification | Available Codex browser/computer-use skills and project harnesses | Requires the relevant tool on the execution host |
| MCP evidence gathering | Discover and use connected apps/MCP tools | Upstream bundles no MCP server or lifecycle hook; none is fabricated |
| Benny | Complete setup, triage, reproduction/fix pack plus scheduled-polling adapter and executable durable ledger | State/recovery mechanics tested; live Slack/tracker still requires connection and readiness test |
| make-bot-ui | Workflow plus executable loopback UI/HTTP-to-Codex bridge | Live-tested fixed summarize/dry-run operations; adapt and review the fixed schema for other workflows; not a public webhook service |

## Verification scope

Structural validation, source-file coverage, helper tests, shell checks, and
installation checks are reproducible locally. See [integration test evidence](INTEGRATION-TESTS.md)
for actual browser, HTTP-to-Codex, persona, GitHub and scheduler-configuration tests.
Live Slack/tracker triage,
unattended scheduler delivery, real PR merging, and UI verification depend on
the user's target services and authorization. They are not enabled by installing
this plugin, and are not claimed as tested by a package preflight. Benny's
readiness checklist explicitly gates activation on a harmless authorized test
and recovery/duplicate checks.

## Official runtime references

- [Skill discovery, invocation and metadata](https://learn.chatgpt.com/docs/build-skills)
- [Subagents and inherited model settings](https://learn.chatgpt.com/docs/agent-configuration/subagents)
- [Plugin packaging and local marketplace development](https://learn.chatgpt.com/docs/build-plugins)

The active host's tool schema is authoritative when an interface differs from
these documents. The plugin must report unavailable capabilities, not invent
equivalent-looking commands.

Codex additions: `automate-maintainer` restores the generator from [ScriptedAlchemy/plugins PR #1](https://github.com/ScriptedAlchemy/plugins/pull/1) and supports named groups. `automate-team` discovers active core contributors before invoking that workflow. These additions do not change the pinned upstream inventory.

The 0.15.17 port adds `$ketchup`, distills prompts and evidence frameworks, and uses two-entry default panels at `xhigh`. Codex defaults map judgment to `gpt-6-astra`, fast code to `gpt-6-luna`, and exploration/tooling to `gpt-6.1-sol`. Host validation and inheritance fallback still apply; configured panel lists and model overrides are preserved. These Codex variants do not provide upstream's cross-provider model diversity. The maintainer/team additions use concise entrypoints with linked scope, mining, synthesis, roster, and held-out evaluation procedures.

The 0.15.28 port adds `in-your-own-words`, `sharpen`, and the formal verification generator and maintenance skills. It brings upstream's PR review pagination, fenced-plan checks, forge-based stack discovery, and default-branch worktree audits. The audit still reads cached refs only and holds untracked or unpreserved work. Codex's native manifest replaces both upstream manifests, and `CODEX.md` replaces the Claude harness adapter; this repo does not package the separate generated Claude distribution. Effort tuning uses supported Codex fields without fabricating model slugs or speed controls. Custom maintainer/team skills and their resources remain unchanged.

The 0.15.29 port changes `$sharpen` to return a rewritten prompt without executing the task, and updates its guide and help entries. It preserves explicit-only Codex invocation and the runtime contract.

The 0.15.32 port adds `$statechart` (TLA+ models, Mermaid charts, and Pele PNG rendering) and `$ketchup-video` with explicit Codex invocation. Statechart runtime helpers are retained verbatim; its test fixtures canonicalize temporary paths for macOS and gate Linux-only preload tests by platform. The helpers need Node, TLC/Java (or mise), and npm for rendering; video generation requires available frame-rendering and encoding tools. Neither feature installs a host integration. Reflection edits go to repository or personal skills outside the plugin cache. PR stack discovery distinguishes fork heads and prefers active PRs, watcher sleeps respect deadlines, inline-code plan parsing matches delimiter lengths, and the worktree audit selects GNU/BSD timestamp flags while preserving Codex session scoping and cached-ref-only behavior. The swarm numbering was already contiguous in this port; its report wording is updated. The upstream Claude marketplace auto-update note does not apply to the Codex installer.

The 0.15.36 port replaces Statechart with upstream's TypeScript compiler and behavioral corpus. The launcher uses Node 22.18+ (Node 23 requires 23.6+), Bun 1.1.5+, or Deno 2.0+; TLC and Java remain external dependencies. It checks models and emits charts and shortest bug paths. Chart-to-TLA+ generation, fixed-state comparisons and code-against-spec auditing are no longer provided. Rendering uses the separate Pele guide. The qualified-action trace fix and macOS SIGKILL test fix are included.

Interrogate now retains only failures the lead reproduces, with scratch repros outside the target checkout. Arena incorporates rejected-assignment handling and an explicit skipped-judge outcome while retaining CODEX.md's model policy, including its precedence over upstream cross-family requirements. Autopilot-stack is Autopilot-full without merging and stacks only dependent PRs. Video summaries gain subtitles and measured hold times. Orchestrate removes the orch CLI and uses native host tools plus explicit durable notes. The root dispatches all workers and verifiers with fresh minimal contexts; children never delegate. Worktrees still require authorization. Tracker/store and PR event integrations are used only when exposed by the host; no integration is activated by installation.
