# Pstack upstream synchronization

> Execution: preserve the user's authorization to implement, publish, merge and install this update without another approval round. Use the existing checkout; no worktrees.

**Goal:** restore the personal fork as the installation source, first synchronize ScriptedAlchemy, then port the original Pstack changes through 0.15.25.

**Architecture:** retain the Codex runtime contract, execution-tool validation and ScriptedAlchemy model bindings. Import upstream workflow improvements and helper fixes with their relevant tests. Keep searchable UI labels in source, separate from skill IDs and invocation policies.

**Tech stack:** Markdown/YAML skills, native Codex plugin metadata, Python validators, Node/Bun helpers, TypeScript.

**Spec:** the user's authorized two-stage update and `UPDATING.md`; ScriptedAlchemy `0f51a61e3b7ec0e5cca6fbb1bc13ed40ec5c983b`, original reviewed pin `11713c683fe4add4fd403ea880580abbc9e0875f`, target `0317eb8b858c991c57721358daaee19dbe8c814d` (0.15.25).

## Global constraints

- Preserve ScriptedAlchemy's Codex model families and role bindings; remove the personal fork's obsolete Sol/Astra-only defaults.
- All installed skill display labels start with `pstack-`; only `setup-pstack` remains implicitly invocable.
- Preserve existing permissions, source attribution, original skill IDs and host-specific runtime adaptations.
- Generated Claude Code trees are a separate host integration, not an implementation of Codex support.
- Keep dependencies outside the distributed plugin; run existing checks and meaningful upstream regressions.
- Remote roles: `origin` personal fork, `scripted` Codex port, `upstream` Cursor original. Never merge the Cursor monorepo into the port.

## Review focus

- Model and effort adjustments use the actual execution tool's supported fields; no invented fast-model slugs or silent loss of explicit overrides.
- Review-thread pagination includes unresolved threads after page one and retains fail-closed handling of read failures.
- Markdown fences do not turn example text into plan requirements or hide genuine requirements.
- Catalog inventory, unique display labels and invocation policies agree after packaging and a fresh provider scan.
- Adapted workflows preserve Codex paths, permissions, transcript scope and native PR integrations.

## Task 1: synchronize ScriptedAlchemy

Files: existing plugin, validators, README and updating guide.

- [x] Integrate the Codex port's latest revision and restore its model defaults.
- [x] Preserve personal marketplace URLs and all `pstack-` labels; enforce labels in the package validator.
- [x] Run package/parity validation, Node/Bun helpers and strict TypeScript checking.
- [x] Commit the synchronization before porting original changes.

## Task 2: port original helpers

Files: `plugins/pstack/skills/poteto-mode/scripts/` and `scripts/test.sh`.

- [x] Import relevant upstream regression cases and observe failures before fixes.
- [x] Port pagination, Markdown-fence handling, orchestration fixes and base-branch audit improvements while preserving native adapters.
- [x] Retain Commander 15 and the port's dependency lock; integrate new test commands where needed.
- [x] Run focused regressions and the helper/type checks.

## Task 3: port workflows and packaging

Files: changed skill entrypoints/references, personas, root guide, source inventory and native manifest.

- [x] Adapt the original's changed workflow text and add `sharpen` and `in-your-own-words` with explicit invocation metadata.
- [x] Preserve Codex role bindings and execution-tool rules; adapt per-job effort and speed handling to supported fields.
- [x] Preserve native PR/automation boundaries; document Claude-specific material as a source reference.
- [x] Reconcile every source file, then advance the reviewed source pin and publish version 0.15.25 with a new Codex revision.
- [x] Regenerate coverage and run structural/link checks.

## Task 4: review, publish and install

- [x] Run the combined suite, strict type checking and diff checks; remove temporary dependencies.
- [x] Obtain an independent semantic review of the complete change and resolve substantive findings.
- [ ] Use `writing-prs` to publish a reviewable PR against the personal fork; register it with T3.
- [ ] Merge the verified PR, switch the marketplace to the personal fork and install it natively.
- [ ] Verify one installed version, unique enabled labels, effective model configuration and fresh-session routing.

## Execution evidence

- ScriptedAlchemy synchronization: package/parity 54 skills and 165 source files; 25 Node checks passed, two optional native checks skipped; 52 Bun tests passed; strict TypeScript passed.

- Original helper regressions: RED observed before fixes; final focused suite 71 Bun tests passed, strict TypeScript passed. Combined suite: 31 Node tests passed, two optional native checks skipped. Pagination rejects missing continuation cursors instead of silently truncating.

- Workflows: 59 original Markdown paths reconciled, 57 adapted. Babysit preserves explicit merge authorization; Comment Sicko already matches. All 76 changed source paths reconciled; 170 source counterparts and 56 unique prefixed labels validated. New skill metadata remains explicit-only.
- Model configuration: existing local role assignments exactly match ScriptedAlchemy defaults; preserved without edits.

- Independent Astra review of the complete branch found two P2 frontier defects and no P0/P1: CLI default truncation and reused branches with historical PRs. Both reproduced before fixes. The focused orchestrator suite passed 25/25 after the fix; multiple-open ambiguity and unchanged state on truncation are covered for gh and Origin.
- Final: Ruling: frontier queries request 1000 rows and reject a response at that boundary, preserving the previous ledger instead of accepting a potentially truncated chain. A unique OPEN row wins over historical PRs; historical ambiguity still fails explicitly. This bounds reads without guessing unsupported pagination APIs.
- Corrected a literal Slack PR URL fragment (`/pull/<number>`), without adding a test for prose.

- Final: fixed both P2 frontier findings — gh/Origin regressions RED→GREEN; final combined suite 31 Node +79 Bun passed, two optional host tests skipped, strict PR-watcher and orchestrator TypeScript passed. Node_modules symlink removed before packaging. Publish/install evidence follows in the PR body after the source commit.
