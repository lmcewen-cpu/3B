A self-contained React slide deck presenting the Access Hub app using the tell–show–tell framework.

Trigger: `GET /access-hub-deck` (space-authenticated webpage). No input, no connectors, no external calls — all slide content is static in [App.tsx](App.tsx).

14 slides in three acts:
- **Tell** (1–4) — what Access Hub is, the access-drift problem, the answer, and a signpost of the walkthrough.
- **Show** (5–10) — Command Center, provisioning board, calendar time travel, the four-step access review chain, findings and remediation, SLA scan, and the SQLite/golden-snapshot data model.
- **Tell again** (11–13) — recap mapped back to the pain, why the step-chain shape matters, and next steps.

Navigation: arrow keys, space, PageUp/PageDown, the progress dots, or the footer buttons. `N` toggles presenter notes (`say` plus optional `notes` on each slide). The current slide is mirrored in the URL hash, so `#7` deep-links.

To change the narrative, edit the `slides` array. `APP_URL` and `WORKFLOW_URL` at the top point at the Access Hub app and its workflow.
