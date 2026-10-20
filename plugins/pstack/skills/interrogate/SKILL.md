---
name: interrogate
description: "Use for \"interrogate\", \"adversarial review\", \"multi-model review\", \"challenge this\", \"stress test this code\", \"find blind spots\", or \"tear this apart\". A reviewer selected by task difficulty challenges changes adversarially."
---

Before following this workflow, read [the Codex runtime contract](../../CODEX.md). It defines plugin paths, model configuration, delegation, and persistence.

# Interrogate

Use one reviewer assignment to adversarially review code changes, selected by the conditional model policy in `CODEX.md`. Routine review uses Sol 6.1; genuinely difficult review uses `hardest tasks`, Astra 6 by default. Do not add reviewers for model diversity. The deliverable is a synthesized verdict. Do NOT auto-apply changes.

## Step 1, Scope

Identify what to review from context:

- If the user points at specific files or a diff, use that.
- If on a feature branch, run `git diff main...HEAD` (or the appropriate base branch) for the full changeset.
- If the user's message references recent work, gather the relevant files.

Package the diff or file contents with any surrounding context files the reviewers need to understand the code.

## Step 2, Intent

Before spawning reviewers, state the intent in one clear paragraph from the user's message, commit messages, the PR description if one exists, and the code. If you're unsure about the intent, ask the user before proceeding.

## Step 3, Spawn Reviewers

Select one effective assignment through `CODEX.md`: `interrogate reviewers`, default `gpt-6.1-sol @ xhigh`, or `hardest tasks`, default `gpt-6-astra @ xhigh`, when the actual work justifies that difficulty. Launch one reviewer on the selected model through Codex collaboration tools. Do not run both assignments or add a reviewer because the coordinator uses the same family.

Forbid writes and mutating commands in every reviewer prompt. Resolve model and effort through `CODEX.md`; aliases omit both overrides, and unavailable choices use the reported inheritance fallback. Offer a configuration repair in the report without blocking the review.

Read `references/reviewer-prompt.md` and fill the template with the stated intent, diff or files, `references/rubric.md`, and `references/code-quality-review.md`. Keep the selected role's configured effort; use only a speed setting supported by the execution tool, per `CODEX.md`.

## Step 4, Synthesize

Read the reviewer's findings, merge duplicate descriptions of the same issue, and check the evidence against the stated intent. Do not discount a finding because only one model reviewed the change. If the user explicitly requested additional reviews, retain their provenance and note agreements or disagreements.

## Step 5, Lead Judgment

You are the lead reviewer, a pragmatic senior engineer, not a neutral aggregator. Read `references/lead-judgment.md` for the full framework. Put every finding in one of four buckets, with the model(s) that raised it and a one-line rationale.

- **Act on**. Real issues affecting correctness, security, or maintainability given the actual goals. They would block a real PR.
- **Consider**. Legitimate, but you're not sure they outweigh the cost of addressing them now. Worth the user's attention.
- **Noted**. Technically valid but not actionable. Context-dependent, premature optimization, or low-impact at this stage.
- **Dismissed**. Wrong, nitpicky, or missing context, with a brief reason.

## Output Format

### Intent
> [The stated intent paragraph from Step 2]

### Reviewers
- Reviewer [label]: [model name], [N findings] (one bullet per reviewer)

### Act On
[Each: description, which models raised it, why it matters.]

### Consider
[Each: description, which models raised it, the tradeoff.]

### Noted
[Brief list.]

### Dismissed
[Each with a brief rationale.]

### Agreement Map
[Where models agreed and diverged, and what that pattern tells us.]
