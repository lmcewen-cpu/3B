Renders the mock data room analysis dashboard as a single React page.

Trigger: HTTP GET on the `/data-room` route. Access is `external_id`: anyone holding the link (which carries the route's unguessable `external_id` query parameter) can view it without signing in. No upstream input is used.

All content is static mock data in [data.ts](./data.ts). Two tabs share the page:

- **Document diligence** — deal metadata, folder coverage, document classification counts, ingestion throughput, risk findings, and the document queue. Filters: search, folder, severity.
- **Investor screening** — outreach funnel, weighted fit-score model, and a ranked investor shortlist with expandable screening rationale. Filters: search, investor type, minimum fit score.

All filtering happens client-side.

To change the demo scenario, edit `data.ts` only — [App.tsx](./App.tsx) derives every total and chart scale from it.
