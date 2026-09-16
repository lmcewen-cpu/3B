Mock dashboard for a deal team working an acquisition. Two tabs: document diligence (how many data room files have been ingested, analyzed, and classified, plus the risk findings that need attention) and investor screening (which potential investors were sourced, how they score against the deal's fit criteria, and where each sits in the outreach funnel).

Flow: a single React step, [Data room dashboard](<./Data room dashboard>), serves the page at `/data-room`. The route uses `external_id` auth — anyone holding the generated link can open it without a 3B account, so the link itself is the only access control.

No external services, no side effects, no schedule. All figures are static mock data — replace `data.ts` (or point the step at a real analysis route) to make it live.
