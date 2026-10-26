# pstack for Codex

A Codex-native adaptation of [Lauren Tan's pstack](https://github.com/cursor/plugins/tree/main/pstack), preserving its workflows, playbooks, principles, and agent personas while adapting host-specific execution to Codex. This is an independent port, not an official Cursor or OpenAI plugin.

This fork tracks [the original Cursor pstack](https://github.com/cursor/plugins/tree/main/pstack) directly, maintains its Codex adapters and model-role defaults, and labels every skill `pstack-…` in the skill picker. [ScriptedAlchemy's Codex port](https://github.com/ScriptedAlchemy/pstack-codex) remains a reference for Codex-specific fixes. Type `$pstack` to browse them.

Code and Swarm use Sol 6.1 at medium reasoning. How, Why, tooling and ordinary judgment/review use Sol 6.1. Difficult judgment/review selects the `hardest tasks` assignment, Astra 6 by default, with one model per task and no added diversity reviewers. Arena candidates use Astra plus Sol; Architect candidates use Sol 6.1 at xhigh reasoning. See [model selection](plugins/pstack/CODEX.md#model-selection) and [`setup-pstack`](plugins/pstack/skills/setup-pstack/SKILL.md) for the full role table and overrides.

The plugin lives in `plugins/pstack`; `.agents/plugins/marketplace.json` makes this repository a native Codex marketplace. Read the [runtime contract](plugins/pstack/CODEX.md), [port coverage and runtime boundaries](PARITY.md), and [per-file source coverage](FILE-COVERAGE.md). Tool availability depends on the Codex host, permissions, and connected integrations. No credentials are bundled.

## Install

Requires a Codex build with `codex plugin` support, Git, and Python 3.11+ for validation.

If your shell defaults to an older Python, set `PSTACK_PYTHON` to the Python 3.11+
executable when running the installer (for example,
`PSTACK_PYTHON=/opt/homebrew/bin/python3.13 ./scripts/install.sh` on a matching
Homebrew installation).

```sh
git clone https://github.com/jipizarroo/pstack-codex.git
cd pstack-codex
./scripts/install.sh
```

The script validates the package, registers this checkout as the `pstack-codex` marketplace, and installs `pstack@pstack-codex`. It does not edit your Codex configuration by hand or overwrite personal agent definitions. Start a new Codex task after installation and invoke `$setup-pstack`. Most pstack skills are intentionally explicit-only; invoke them with `$<skill-name>`, such as `$interrogate`. Ask to use `$poteto-mode` as a standing instruction for the current task when you want the orchestration workflow. Repository-local skills belong under `.agents/skills`, not `.codex/skills`.

Use `$automate-maintainer sokra, alex for owner/repo` to draft conventions from named GitHub users. Use `$automate-team owner/repo` to discover active core contributors and mine their code, reviews, and design discussions into a team mode. Both workflows keep evidence and ownership explicit; they create skills without posting or acting as the people studied.

Alternatively, install the published marketplace without cloning:

```sh
codex plugin marketplace add jipizarroo/pstack-codex
codex plugin add pstack@pstack-codex
```

Optional named custom agents are provided in `plugins/pstack/codex-agents`. Review these before copying them into `~/.codex/agents`; the workflows also support generic workers loaded with the corresponding persona instructions, so copying agents is not required. Run `setup-pstack` to configure model preferences and connected integrations. Hooks, MCPs, and external automation services are not automatically invented or enabled: consult the runtime contract and workflow setup instructions for the actual supported equivalents.

## Verify and develop

```sh
./scripts/validate.sh
```

The portable validator checks the marketplace, manifest, all skill entry points, searchable `pstack-` labels, invocation policies, relative runtime links, agent TOML, and every file in the pinned upstream inventory. Labels live in each skill's `agents/openai.yaml`, so reinstalling preserves them. Run `python3 scripts/parity.py --report` for a per-file retained/adapted/replaced report. Runtime-dependent integrations still need an authenticated end-to-end test in the target host; structural checks do not prove external-service delivery.

The [integration test report](INTEGRATION-TESTS.md) separates live host/service
proof from fixture coverage. Run `bash scripts/test.sh` for the combined suite
after installing the Bun helper dependencies below. The bot UI ships a tested
loopback HTTP-to-Codex bridge, and Benny ships a tested durable polling ledger;
neither starts automatically on installation.

Helper-script tests require Bun:

```sh
cd plugins/pstack/skills/poteto-mode/scripts
bun install --frozen-lockfile
bun test orch watch-pr check-plan.test.ts
bun run typecheck
node --test check-plan.test.mjs worktree-audit.test.mjs
```

Before reinstalling a modified local plugin, use Codex's `plugin-creator` skill cachebuster/reinstall flow; then run `./scripts/install.sh` and start a new task. Keep the published version updated when shipping changes so existing installations do not reuse stale caches.

Move test-only `node_modules` outside the plugin directory before installation;
the installer refuses to package it. Remove temporary test dependencies after validation; do not commit or distribute them.

## Track upstream safely

The source snapshot is pinned in [UPSTREAM.json](UPSTREAM.json). This repository uses its own native layout and history; **do not merge the entire Cursor plugins monorepo into this repository**.

```sh
git remote add upstream https://github.com/cursor/plugins.git # once, if absent
./scripts/check-upstream.sh
```

The audit fetches upstream Git objects and prints pstack-only changes since the pinned source. It never replaces translated files or advances the pin. See [UPDATING.md](UPDATING.md) for the review-and-port procedure. `origin` is this fork, `scripted` is ScriptedAlchemy's Codex port, and `upstream` remains the original repository. Add the Codex port with `git remote add scripted https://github.com/ScriptedAlchemy/pstack-codex.git` and synchronize it before porting newer original workflows.

## License and attribution

MIT. Original pstack copyright © 2026 Lauren Tan; original license is retained in [LICENSE](LICENSE) and the plugin. Codex adaptation changes are distributed under the same license. Upstream version: 0.15.30, source commit `eb4db2b55b2b7dec3d9282754cddf0a56bf4ff10`.
