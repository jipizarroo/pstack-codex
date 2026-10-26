# Port coverage and runtime boundaries

This is a workflow port, not an emulation of Cursor's runtime. All 184 files in
the pinned upstream snapshot have a retained, adapted, or explicitly replaced
counterpart. Run `python3 scripts/parity.py --report` for the per-file inventory.
File coverage alone does not prove behavioral equivalence.

| Upstream feature | Codex implementation | Boundary |
|---|---|---|
| 57 upstream skills, 2 Codex additions, and 23 playbooks | Native skills, relative resources, shared `CODEX.md` runtime contract | Invocation uses `$skill-name`; routed explicit-only skills are read directly |
| Engineering principles | All 24 principle skills retained | Applied when the routing workflow calls for them |
| poteto-agent and Comment Sicko | Bundled persona instructions; optional custom-agent TOML | Named-agent registration is optional, not automatic plugin discovery |
| Role-based models and panels | Host-validated model/effort preferences; inheritance fallback | Model availability and concurrent capacity depend on the host; panels run in waves |
| Parallel workers | Bounded Codex subagents with separate file ownership; authorized isolated checkouts where needed | No automatic cloud VM, branch isolation, or durable worker ID |
| Sticky mode/reminders | Standing task instruction; optional scoped `AGENTS.md` for cross-task persistence | Opt-in per repository, not a Cursor UI-mode switch; see [method](plugins/pstack/docs/standing-mode.md) |
| Long-running goals and loops | Explicitly requested goals, supported heartbeat/project automations, durable ledgers | Requires scheduler availability; detached sleepers are not persistence |
| PR watching, orchestration, decision logs | Retained executable helpers with Codex paths and safety fixes | Authenticated GitHub and target repository permissions are required |
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

This fork's defaults map ordinary judgment/review, How, Why and tooling to `gpt-6.1-sol`, and code/Swarm to `gpt-6.1-sol @ medium`. The conditional roles in `CODEX.md` select the `hardest tasks` assignment, default `gpt-6-astra @ xhigh`, only for concretely difficult work. Each selects one model and keeps that assignment's effort; no extra reviewer is added for family diversity. Arena candidates run Astra plus Sol, while Architect uses `gpt-6.1-sol @ xhigh` for its structural alternatives. Explicit user choices, effective-role inheritance aliases, execution-tool validation and reported fallback still apply. The maintainer/team additions use concise entrypoints with linked scope, mining, synthesis, roster, and held-out evaluation procedures.

The direct original-source sync to 0.15.32 updates statechart's renderer, bug paths, replay and specification comparison, adds `$ketchup-video`, and routes formal model-check results through `$statechart`. Reflect edits go to writable Codex skill directories instead of the plugin cache. Helper fixes cover matching inline-code delimiters, fork heads in PR stacks, polling deadlines, and GNU/BSD transcript timestamps. The existing active-PR preference, Codex session ownership checks, cached-ref audits, and model orchestration remain in place. Cursor and Claude marketplace setup notes remain host-specific and are not installation instructions for this Codex port.

The 0.15.25 workflows add `$sharpen` and `$in-your-own-words`, shorter visual `$ketchup` briefs, per-job effort policy, and updated verification and autopilot guidance. Model efforts use separate supported execution-tool fields; speed requires an actual exposed field, never a fabricated model suffix. Helper updates include review-thread pagination, Markdown fence parsing, orchestration frontier fixes, and configurable audit bases. Audit reads cached refs without fetching and retains Codex session scoping and preservation checks.

The original's Agent Plugins v1 manifest and Cursor manifest both map to the single native Codex manifest. Its new [Claude Code adapter](plugins/pstack/docs/harness/claude-code.md) is retained as a source reference; the generated Claude tree is not distributed or activated by this marketplace.

The 0.15.28 port adds explicit create/maintain formal-verification skills and an optional setup offer. TLA+ is the default for ordering models; generated-input fallback is reported as empirical evidence. Ketchup retains every pending decision even when the reply grows. Sharpen follows the relaxed upstream prompt-output rule. Claude Code remains a documented source reference.

The 0.15.30 port adds the explicit Statechart skill with its original Node scripts and fixtures. TLC requires Java 11+ and a `TLA2TOOLS` path to tla2tools.jar; PNG output additionally requires Mermaid CLI and its browser runtime. These external tools are not activated by installing the plugin. Sharpen now returns a rewritten prompt without executing the task.
