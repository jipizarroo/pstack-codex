# Updating from Cursor pstack

This fork updates directly from the original `cursor/plugins` repository. `origin` is `jipizarroo/pstack-codex` and `upstream` is `cursor/plugins`. The optional `scripted` remote, `ScriptedAlchemy/pstack-codex`, is a reference for Codex-specific fixes; synchronizing it is not a prerequisite. Preserve this fork's marketplace URLs, `pstack-` display labels, Codex adapters, and model-selection policy in `CODEX.md`. Neither another Codex port's assignments nor original host-specific model strings should overwrite them during a source sync.

`UPSTREAM.json` records the exact source last reviewed. Keeping an `upstream` remote enables a deliberate port; it does not mean Git can safely merge two different layouts.

1. Begin with a clean working tree or preserve your work on a separate branch.
2. Run `scripts/check-upstream.sh`. It fetches the original remote, verifies the pinned commit, then shows only changes under upstream `pstack/`. A nonempty diff means review is needed, not that the Codex port can be replaced.
3. Inspect individual changes with `git diff <pinned-commit> upstream/main -- pstack/<path>` and compare with `plugins/pstack/<path>`. Use `git show upstream/main:pstack/<path>` to read a new upstream file.
4. Port relevant workflow changes while preserving `CODEX.md`, native manifests, invocation metadata, local paths, Codex delegation, and supported automation behavior. Do not run a global string replacement or copy Cursor runtime instructions over Codex adapters.
5. Inventory added/removed skills, personas, principles, playbooks, scripts, hooks, and MCP declarations. Check whether any new host integration has a real Codex equivalent. Document any capability or trigger/latency difference, rather than claiming unsupported equivalence.
6. Run structural validation, helper tests, and targeted end-to-end host/integration tests. Preserve the MIT license and author attribution.
7. Only after all relevant changes are reconciled, update `UPSTREAM.json` to the reviewed commit/version and update the plugin version with the supported cachebuster flow. Commit the changes and pin together, reinstall, and test in a fresh Codex task.

The audit script updates only Git objects/remote-tracking references. It does not modify plugin files, commit, push, or update the source pin. An upstream change outside `pstack/` alone does not indicate plugin drift.
