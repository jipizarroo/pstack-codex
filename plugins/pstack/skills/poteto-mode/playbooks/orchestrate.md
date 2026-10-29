### Orchestrate

**You run the program, never the code. Decide which agent does each piece of work, then check what each one produces.** For a standing project handed to one coordinator chat: multi-day, many stacked PRs, dozens to hundreds of subagents, few human turns. One task driven to a predicate is Autonomous run. One ambitious run that needs a bespoke workflow is figure-it-out. Work that one agent could finish inside the session's budget is not a program.

Read [the Codex runtime contract](../../../CODEX.md) before dispatching. Run the program with the active host's collaboration tools. Keep goals, owners, branches, head SHAs, evidence and pending decisions in `notes.md` under the explicit state directory from CODEX.md. Use a project tracker or store only when the host exposes one. Watch PRs with native PR/CI subscriptions when available; otherwise report current state and the monitoring limitation. The coordinator uses no orchestration CLI or polling loop. Workers still run the commands their acceptance criteria require.

#### Topology

- **One owner per PR.** The owner is the only writer of its branch and carries the PR from build to merge. Only the owner pushes, rebases, or retargets it. Closing or retargeting a base PR orphans every PR above it, so the owner does that only on your call. You never author or edit code. Conflicted merges, chain rebases, and fixes go to owners.
- **A fresh worker for each independent task.** Use `fork_turns: "none"` with a minimal explicit brief, absolute file pointers and the upstream evidence it needs. No worker inherits sibling context, a cloud VM or an isolated checkout. Give writers separate file ownership or serialize overlapping work. Worktrees require explicit user authorization. Resolve model and effort through CODEX.md and the active tool schema.
- **Keep dispatch at the root.** Children must not delegate. The root owns all worker and verifier kickoffs, bounds concurrency by actual host capacity, and starts ready work as children finish. Group related units in the durable notes when useful; do not create a nested coordinator hierarchy.
- **Reuse an agent only for the same work when its live state is needed.** Pass existing checkout paths or process details explicitly; never inherit the conversation to transfer state. New independent work gets a fresh child. Use read-only status tools or completion events for liveness rather than sending a message that restarts an idle child.
- **Each PR gets a verifier that isn't its author.** Select its role and effort under CODEX.md, whose configured model policy takes precedence over upstream family-diversity requirements. The owner merges only when authorized and after that verifier passes the current head.
- **Start with one unit.** Take it through kickoff, owner, verifier, and merge before you fan out, so a flaw in the kickoff costs one agent instead of fifty. On near-identical cheap units, the first unit is that test.

#### Supervision

- **Each kickoff names the evidence that proves the work is done,** such as a command and its expected output, a control-skill check, or an artifact. It also names the goal, the paths the worker may and may not write, and the actions it must not take. If you can't name the evidence, the unit isn't scoped yet.
- **Read the diff or the artifact, not only the worker's summary.** Green CI is an input to a verdict, not a verdict. Behavioral work needs more than a type check. A verdict covers one head SHA, so a new push needs a new verdict. Review worker kickoffs while the program runs and fix the brief when one fails.
- **Send back work that drifts from scope or grows past what was asked.** Keep only the fixes that block the program, and park the rest as follow-ups.
- **Check a PR's live state before you report on it,** with `gh pr view` and `gh pr checks` or your forge's equivalents, not the worker's last report. Account for every worker you spawned as done, replaced, or absorbed into another worker's scope.
- **Stop or replace a worker that stalls or loops.** Judge it by its pushes and PR activity, not its status text. Retry by cause: a smaller scope after a context or memory limit, the same kickoff after a dropped connection, and a corrected tool call after a tool error. A model fallback must follow CODEX.md and explicit user choices. After two retries, drop the unit and replan around it. When a stopped worker returns late, check its result against the PR's current state, and hand any unique findings to a fresh worker.
- **Ask the user only for a real decision or a blocker,** such as an irreversible action, a product or preference call that no experiment settles, or a dead end that survived a replan. Rebase mechanics, retries, CI flakes, review triage, and "should I keep going" never reach the user.

**Reply:** what landed against the goal, each PR's live state and verdict with its link, what was dropped and why, and the decisions waiting on the user.
