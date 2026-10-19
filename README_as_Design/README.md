# README as Design seed

Make a workspace understandable when someone opens a folder. Put a short human introduction at the top of README.md, then the agent's operating contract below it. People and agents share one entry point and one authoritative set of rules.

Version: 1.0.0. Use once to establish or migrate this convention. This is a setup seed, not a recurring skill.

> Apply this seed to the workspace I identify. Inventory existing instructions, propose the migration, and wait for my approval before changing files. Preserve all valid rules.

## Design intent

This convention grew from reading Don Norman's *The Design of Everyday Things* and observing users miss guidance stored in CONTEXT.md. The resulting design choice is to signal what humans should read and give them a compact introduction before the agent's detailed instructions.

A filename is part of the interface. README signals something worth reading; a short opening gives the human a next action, while the remainder gives the agent boundaries and pointers. This is a practical design hypothesis, not a claim that a filename guarantees usability or that a book proves it.

Keep substantive knowledge in linked canonical files. README is navigation and a compact contract, not a content dump.

## Before writing

Confirm destination, language, owner, users, and modification permission. Save open files and read existing agent instructions. Inventory README.md, CONTEXT.md, AGENTS.md, CLAUDE.md, and tool configuration. Find incoming links, scripts, and tests before proposing moves.

If the convention already exists, repair only requested gaps. Ask only questions affecting navigation, privacy, authority, or the human task. No implied permission to publish, upload, delete, or communicate externally.

## Propose and wait

Create README_MIGRATION_PLAN.md in the approved change-record location. For every in-scope file, record old path, rule or content, canonical destination, incoming references, action, conflict, and recovery location.

Propose one representative README before a broad migration. Identify the approver and unresolved conflicts. Existing higher-priority instructions remain authoritative.

Stop until the owner approves the exact scope, example, and migration. Silence and your own checklist are not approval.

## Build the convention

Use this pattern for each substantial folder:

```markdown
# [Recognizable folder name]

[One sentence: purpose.]
[One sentence: what the human should do or put here.]
[A useful relative link to the next artifact or entry point.]

## Agent instructions

### Purpose and scope
[One job, entry condition, exclusions, and authority.]

### Read first
| Need | Canonical path | Relevant section |
|---|---|---|
| [Task] | [Relative link] | [Minimal required scope] |

### Process and outputs
[Exact inputs, method link, output paths, and observable checks.]

### Review and boundaries
[Named approver, concrete gate, evidence location, prohibited actions.]

### Maintenance and recovery
[Owner, next action, archive policy, and stale-link correction.]
```

The opening usually fits in three to six human-readable lines. Give one obvious next action. The agent section must support safe execution, linking to detailed content rather than duplicating it.

Retain AGENTS.md as the tool-recognized root entry point with authority, routing, and permissions; link it to root README.md for shared workspace context. If CLAUDE.md is needed, use a compatible pointer to the same contract. README does not guarantee automatic tool discovery or replace required tool filenames.

For a human-only Help folder, put this sentence before its heading:

> This space is for humans only. AI agents should come in here only if specifically asked to.

Keep the same boundary in root agent instructions. A filename migration does not grant access to Help; creating or changing it requires authorization within the current request.

## Migrate safely

1. Re-read targets immediately before writing; reconcile intervening edits.
2. Move valid CONTEXT.md rules into README.md without losing permissions, gates, authority, or source links. Move content payloads to their approved canonical files.
3. Resolve contradictions with the owner; never silently choose weaker rules.
4. Update incoming links, routing, scripts, and tool entry points in the same approved change. Check relative paths and case.
5. Archive former files with original path, reason, date, replacement, and restoration route. If an unmodifiable consumer needs CONTEXT.md, retain a short compatibility pointer with no independent rules; record its dependency and removal condition.
6. Record completed mappings and unresolved consumers in the migration plan. Do not declare completion while a required consumer is broken.

Do not rename CONTEXT.md files outside the approved scope. Preserve unrelated work and repository conventions.

## Validate and hand over

Ask a new reader to identify purpose and next action from the human opening. Cold-walk from the agent entry point to one task, its inputs, and exact output path within three reads.

Check links, every migrated permission and gate, tool discovery where testable, Help exclusion, and archive restoration. Test a missing reference: report the gap instead of inventing content or weakening rules.

Save actual results, untested capabilities, unresolved consumers, maintenance owner, and human acceptance in README_MIGRATION_PLAN.md. Do not claim a usability test or tool execution occurred if only document review was possible.

## Completion checklist

- [ ] Scope, representative README, and migration were approved.
- [ ] Human openings are compact and provide a next action.
- [ ] Agent contracts specify scope, inputs, outputs, boundaries, and gates.
- [ ] Detailed content has one canonical home reached through pointers.
- [ ] Required AGENTS.md and CLAUDE.md entry points remain usable.
- [ ] No valid rule, permission, or approval gate was lost.
- [ ] Consumers are updated or retained as documented dependencies.
- [ ] Archives preserve provenance and recovery; unrelated work is untouched.
- [ ] Help access remains limited to explicitly requested work.
- [ ] Checks, acceptance, limitations, and maintenance ownership are saved.
