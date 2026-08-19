A self-contained onboarding guide for new 3B tenants. Import it into a prospect's tenant and send them the link: it walks an admin through configuring the tenant in the order things depend on each other — identity, members, groups, roles, shared resources, spaces, then building — and lets them flag any step where they'd like help from a Tines Solutions Engineer.

Four steps, all reachable directly; there are no links between them.

- [Tenant setup guide](<Tenant setup guide/README.md>) — the eleven-page wizard at `/tenant-setup`, with a progress bar that ends on "Ready to build".
- [Documentation index](<Documentation index/README.md>) — the standalone reference page at `/tenant-setup-docs` listing every doc and tenant settings link the guide references.
- [Record request](<Record request/README.md>) — `POST /tenant-setup-request`, called by the guide when someone asks for Solutions Engineer help, and by the review page to add requests manually or change their status.
- [Review requests](<Review requests/README.md>) — the page at `/tenant-setup-requests` listing those requests, where you can add one by hand and tick each off as taken care of or reopen it.

All four routes are restricted to members of the space. There are no connectors and no external API calls; the only writes are to the space volume `se-requests`, which holds the help requests in a SQLite database. Help requests are anonymous — no name, email or IP is captured — and guide-raised requests are keyed by guide step, so each step holds at most one request.

To change the guide's copy, add a page, or adjust the checklists, edit [Tenant setup guide/content.ts](<Tenant setup guide/content.ts>).
