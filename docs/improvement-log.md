# Improvement register — November 26, 2026 IST

Repository: atishayjain005/CourseDetailApp. Branch: codex/daily-course-reliability.
Project: https://github.com/users/atishayjain005/projects/21

| Problem | Proposed improvement | Reason / expected impact | Complexity | Risk | Recommendation / status | Deployment requirement |
| --- | --- | --- | --- | --- | --- | --- |
| Module-global array mutates after render, leaking state across mounts | Own immutable course entries in React state; validate API data | Courses render immediately and invalid responses cannot crash cards | Small | Low | Implemented, review/testing | Frontend rebuild |
| Unhandled requests leave users without feedback and allow duplicates | Pending guard, 15-second abort, safe failure feedback without retries | Preserve existing entries and explain uncertain remote outcomes | Medium | Low; backend behavior unknown | Implemented, review/testing | Frontend rebuild; service verification before release |
| Filters and search are inert | Native search, publication and added-order filters; reset; label unavailable type | Make existing controls useful without inventing metadata | Small | Low | Implemented, review/testing | Frontend rebuild |
| Four-column fixed layout and unlabeled controls | Adaptive grid, semantic cards, keyboard focus and labeled controls | Usable narrow viewport and keyboard navigation | Small | Low | Implemented, review/testing | Frontend rebuild |
| No regression checks or accurate setup/release information | Mocked contract/component tests, CI and current README | Repeatable verification with no remote writes | Small | Low | Implemented, review/testing | No independent deployment |
| Next.js 11 legacy tree has 32 audit findings | Scope a supported framework/dependency migration | Clear release risk while preserving behavior | Medium | Medium; framework compatibility | Backlog; prepare concrete migration scope before approval if architectural changes needed | Rebuild and verify free hosting |
| No verified service success or complete course CRUD/type contract | Confirm service ownership, contract, availability and existing free hosting | Establish safe release path without inventing backend capabilities | Medium | High if backend is changed | Backlog; read-only verification first | Backend/environment access may be needed |

No approval requests, deadlines or auto-approvals this run. Existing POST payload preserved; no test sends a live POST. No authentication/database changes or fabricated course data added to the product. Test fixtures stay in tests.

Validation: six test cases pass, ESLint passes, production build passes using the documented legacy compatibility flag. Initial component-test transpilation failure corrected and all tests rerun. Browser QA and deployment results are recorded in the PR after verification.

CI follow-up: the initial push failed clean installation because the converted legacy lockfile lacked peer dependency entries. Regenerated the lock with peer resolution, then validated npm ci, tests, lint and build. Audit after repair: 32 findings (9 critical, 17 high, 6 moderate). This supersedes the initial install count of 33. This is a separate reproducibility fix, not the planned framework migration.
