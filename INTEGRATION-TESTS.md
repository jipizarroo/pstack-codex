# Integration verification

These results distinguish real host/service tests from local fixture coverage.
They do not certify arbitrary production repositories or connected services.

## Observed on 2026-10-22 (America/Santiago), Pstack 0.15.30

- Package preflight passed for 59 skills and all 184 original source counterparts. The 59 `pstack-` display labels are unique; all 212 links in the affected Markdown files resolve. The 11 Statechart support files and fixtures match the pinned original byte for byte.
- The default Statechart run passed 27 tests and skipped 31 that require TLC. The documented installed-relative `statechart.mjs --help` command passed. Two review rounds resolved an entrypoint path typo and found no remaining material integration or documentation issues.
- An optional run with temporary Temurin Java 17 and TLC v1.7.4 was stopped after approximately 16 minutes. Its partial report has 52 passed, three failed, one skipped and one cancelled test; the final test did not run. This is not a passing full TLC suite.
- The three observed failures are in unchanged original fixtures: the killed-Node test tries to kill an already-finished process group (`ESRCH`); the rename-failure fixture uses Linux `LD_PRELOAD`, which does not inject the intended fault on macOS; and the temp-isolation assertion compares `/var` with Java's canonical `/private/var` path. No fixes to these original fixtures or broader portability claims are included in this update.
- The local model file remains byte-identical. Bundled model defaults, runtime contract, existing production helpers and the original PR-query default are unchanged. Temporary Java/TLC tools were used only for validation; no global JVM was installed. The update does not establish that any application property was formally proved or that real PNG rendering works.

## Observed on 2026-10-19 (America/Santiago), Codex revision 202610190002

- Code/refactoring, bug-fix, performance, hillclimb and Swarm now default to `gpt-6.1-sol @ medium`. The local override and bundled table agree across all 17 roles; exactly those five assignments changed, preserving the other 12 roles and the user's selection policy.
- Package preflight passed for 58 skills and 172 source counterparts. Skill frontmatter is unchanged. Active defaults, guides and templates contain no remaining Luna references.
- All seven existing plan-validator checks passed with the updated shipped template, including an alternative worker model, inheritance and rejection of an unfilled worker placeholder. Production helpers were not changed and their other suites were not repeated.
- Static review checked fallback without overrides, Swarm overrides, mixed efforts on a setup rerun and a single-role change. These checks do not establish task quality or cost relative to Grok, Luna or other reasoning settings.

## Observed on 2026-10-19 (America/Santiago), Pstack 0.15.28

- Structural validation found 58 skills and counterparts for all 172 reviewed source files. Skill IDs, unique `pstack-` labels, explicit invocation metadata and relative links passed their checks.
- A fresh read-only Codex session on Sol 6.1 evaluated seven routing scenarios from the bundled defaults, ignoring local overrides. It selected one Sol reviewer for routine work and one Astra reviewer for a concrete concurrency problem, kept both Astra/Sol Arena candidates, used Astra for both Architect alternatives, kept Reflect's existing lenses on Sol, omitted model/effort for effective-role inheritance, and honored an explicit per-task Sol choice.
- This is a bounded instruction-interpretation smoke check. It did not launch real panels or generate work on Astra/Luna, and it does not establish universal model-selection reliability.
- The local model file remained byte-identical, and all configured role assignments match the bundled defaults. Helpers and their PR-query default are unchanged, so their earlier Bun/Node suites were not repeated for this Markdown/metadata update.
- The new formal-verification workflows were validated as packaged skills. No application property was formally proved and no verifier or external integration was activated during this update.
- Independent review caught that a sync-commit diff omits uncommitted covered code. Maintenance now blocks affected checks before running or updating them, including staged, unstaged, untracked and moved code; it leaves the user's changes and the sync commit intact. Architect's runner prompt also permits distinct designs on the same assigned model.

## Observed on 2026-10-17 (America/Santiago), Codex revision 202610170003

- Restored the original Pstack PR-query default by removing our explicit 1000-row override and its row-count guard. The query function matches the pinned source byte for byte; the separate unique-open-PR correction is retained.
- The 75 Bun helper tests and strict TypeScript checks passed. Package validation found 56 skills and 170 source counterparts. Four checks that required the removed override were retired; the gh/Origin tests for reused branches and multiple active PRs remain.
- This follow-up accepts the original CLI query behavior; it does not claim complete traversal beyond the CLI's default result window.

## Observed on 2026-10-17 (America/Santiago), Codex revision 202610170002

- Imported original helper regressions before production changes: they exposed failures in Markdown fences, orchestration frontiers, review-thread pagination, Code Review Gate handling, and audit base selection.
- The final helper suite passed 79 Bun tests and strict TypeScript checking for both PR-watcher and orchestration code. The combined suite passed 31 Node fixture checks; two optional native-host checks were skipped.
- Added a pagination regression beyond the imported source cases: a continuation page without a valid cursor fails closed instead of silently omitting later review threads. A failed second page remains a read error.
- Independent review exposed frontier truncation and reused-branch ambiguity. Regression fixtures for both gh and Origin now cover an open descendant after 30 historical PRs, preservation of the ledger at the 1000-row query boundary, the unique active PR on a reused branch, and rejection of multiple active PRs.
- Kept Commander 15 and the Codex dependency lock, scoped transcript ownership, WIP protection, and audit reads without fetching. These are local/fixture checks, not production PR monitoring or a live Claude Code integration test.

## Observed on 2026-10-11 (America/Los_Angeles)

Validated the source checkout at upstream 0.15.17 with `codex-cli 0.162.1`.

- Package validation found 54 skills and counterparts for all 165 upstream files. All 28 touched skill entrypoints passed skill-creator validation; bundled Markdown links resolved.
- The combined suite passed 25 Node fixture checks and 52 Bun tests, plus TypeScript validation. The native sandbox test remained opt-in and was not rerun.
- Two fresh read-only Codex sessions loaded the scoped instruction marker. The persona review identified the exact narrating comment and routed the read-only question to Investigation; fixture files remained unchanged.
- A bounded offline Codex evaluation exercised `$ketchup` and the maintainer/team workflow against synthetic chat and roster data. It kept an earlier release hold and toolbar decision visible, excluded agent-owned documentation work from action items, retained a specialized active owner, excluded the bot and inactive maintainer, and withheld private conventions and unsupported consensus. This is a workflow smoke check, not validation against real maintainer history.
- Temporary test dependencies and disposable fixture directories were removed after validation. This run did not install the updated plugin or mutate external services.

## Observed on 2026-09-17 (America/Los_Angeles)

| Area | Evidence | Result / remaining boundary |
|---|---|---|
| Installed plugin | Installed cache compared with source; fresh Codex session loaded an installed skill | Passed; restart/start a new task after reinstall |
| GitHub PR watcher | Read-only `--status-only` query against `cursor/plugins#389` retrieved head, reviews and live CI | Passed; no comment, mutation or merge performed |
| Native scheduler configuration | Created a paused current-task heartbeat, viewed it, then deleted it; deletion acknowledged | Passed for configuration lifecycle only; not timed delivery |
| Bot UI | In-app Browser filled the actual local form and submitted a dry run; response reported 51 characters | Passed without external writes |
| Bot execution | Local HTTP bridge launched authenticated `codex exec`, returned HTTP 200 and a summary of a harmless tree-planting fixture | Passed; server stopped afterward |
| Bridge failure controls | Real HTTP requests and controlled subprocess fixtures | Schema, body bounds, origin/host/authentication, rate/concurrency, child failure and timeout checks |
| Benny polling ledger | Separate CLI processes and fixture messages | Durable state, locking, duplicate handling, paging, delayed verdicts and ambiguous-action handling; not live Slack |
| Personas and standing instructions | Fresh Codex CLI session with installed persona and temporary scoped `AGENTS.md` | Read-only review found fixture comment and selected Investigation; source fixture unchanged |
| Worker isolation | Temporary Git repository and worker worktree | Worker commit and files stayed off parent branch |
| Native read-only sandbox | Actual native sandbox attempted `touch` in a temporary fixture; OS returned `Operation not permitted`, exit 1, and no file was created | Passed on the tested macOS host; not a guarantee for full-access child configurations |

No test contacted Grokbot. No production Slack message, tracker issue, PR merge,
or persistent test server was created. The paused scheduler fixture was removed.

## Repeatable tests

Install Bun and Python 3.11+, install the helper dependencies with
`bun install --frozen-lockfile` in `plugins/pstack/skills/poteto-mode/scripts`, then
run `bash scripts/test.sh`. `PSTACK_PYTHON` can select a non-default Python.
The initial 2026-10-17 revision (202610170002) passed 110 helper and fixture checks. Two additional opt-in host
checks (live persona/scoped instructions and native sandbox enforcement) passed
in the earlier host run, not during this update. Tests under `tests/runtime` document the opt-in live Codex test; it consumes
account usage and does not run as part of an ordinary fixture-only pass.

Do not package `node_modules` into a plugin release or commit runtime state.
The bridge and Benny ledger themselves use only Node built-ins.

## Still gated on the target environment

- **Slack/Linear end-to-end:** directory discovery found both integrations
  available but unconnected. Connect them and select a harmless test channel and
  tracker project before creating test messages/issues. Follow Benny's readiness
  test, including duplicate/interrupt recovery and read-back after writes.
- **Timed scheduler delivery:** a saved paused automation is not proof of a
  wakeup. Test one harmless scheduled run on the intended host, inspect its
  observed output, then remove the fixture. Verify the host can access the
  required integrations unattended. CLI-only runs must not pretend desktop
  scheduling tools are available.
- **PR mutation and application reproduction:** fixture/unit coverage and
  read-only GitHub queries do not test a merge, a production fix, or an arbitrary
  app UI. Use an explicitly selected disposable target before enabling these.
- **Cloud execution:** explicit worktrees are the local isolation equivalent,
  not provisioned cloud machines. Unattended lifetime depends on the selected
  Codex host/scheduler and its permissions.

See [PARITY.md](PARITY.md) for the native method used for each upstream feature.
