Orders a laptop and accessories for a new hire.

An HR or onboarding system POSTs an order to the **Receive order** webhook. The step validates the
request against a fixed hardware catalog, answers `202 Accepted` with a normalized order, and
**Create IT ticket** turns that order into a Jira issue for IT/procurement.

Flow: [Receive order](<./Receive order/README.md>) → [Create IT ticket](<./Create IT ticket/README.md>)

- Catalog options live in [Receive order/script.ts](<./Receive order/script.ts>).
- Jira project key and issue type live at the top of [Create IT ticket/script.ts](<./Create IT ticket/script.ts>).
