Runs downstream of **Receive order**. Parses the order out of the upstream HTTP response body and
creates a Jira issue via `POST https://$JIRA_DOMAIN/rest/api/3/issue`, using the Jira connector for
authentication.

Set `PROJECT_KEY` and `ISSUE_TYPE` at the top of [script.ts](./script.ts) to match your Jira project.

Outputs JSON with `order_id`, `issue_key`, and `issue_url`. Retries twice on failure; Jira issue
creation is not idempotent, so a retry after a partially succeeded create could duplicate a ticket.
