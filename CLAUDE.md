# showroom

## Git

Solo playground repo — commit and push directly to `main`. Never open PRs or delete remote branches
unless I ask. (`gh pr create` is hook-enforced here.)

## Agent skills

### Issue tracker

Issues live as local markdown files under `.scratch/<feature>/` (local only, gitignored). See `docs/agents/issue-tracker.md`.

### Triage labels

The five default roles (`needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`), recorded as a `Status:` line in each issue file. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: one `GLOSSARY.md` and `docs/adr/` at the repo root. See `docs/agents/domain.md`.
