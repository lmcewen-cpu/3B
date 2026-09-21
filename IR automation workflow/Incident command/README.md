Entry point for the `/incident` Slack slash command. Slack posts an
`application/x-www-form-urlencoded` request to the route `/incident-command`.

**Trigger:** HTTP route `POST /incident-command`, authenticated with
`route_auth = "external_id"`. Configure the Slack slash command Request URL as
`https://<space>.3b.run/incident-command?external_id=<minted-id>` — Slack
preserves the query string, which satisfies 3B route auth without needing the
Slack signing secret.

**What it does**

1. Parses the slash-command body and splits `text` into a `subcommand` and its
   arguments. Supported subcommands: `start`, `update`, `action`, `summarize`,
   `rip`, `archive`.
2. Immediately returns HTTP 200 with an ephemeral "on it" ack (Slack's 3-second
   rule). The JSON response body also carries a `payload` object with the parsed
   command — downstream worker steps read this from the response body.
3. Fans out to every worker step. Each worker checks `payload.subcommand` and
   does nothing (emits no output) unless the command is theirs.

Real results are posted back to Slack asynchronously by the workers via the
command's `response_url` and the Slack Web API.

See [script.ts](script.ts).
