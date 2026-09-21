// Incident command router.
// Reads a Slack slash-command HTTP request, parses it, and returns a fast
// ephemeral ack. The JSON response body carries a `payload` object that the
// downstream worker steps read (their stdin is this HTTP response).

function parseHttpRequest(raw: string): { body: string } {
  const sep = raw.indexOf("\r\n\r\n");
  if (sep === -1) return { body: "" };
  return { body: raw.slice(sep + 4) };
}

const raw = await Bun.stdin.text();
const { body } = parseHttpRequest(raw);

const form = new URLSearchParams(body);
const commandText = (form.get("text") ?? "").trim();
const parts = commandText.split(/\s+/).filter(Boolean);
const subcommand = (parts.shift() ?? "").toLowerCase();
const args = parts.join(" ");

const payload = {
  subcommand,
  args,
  channel_id: form.get("channel_id") ?? "",
  channel_name: form.get("channel_name") ?? "",
  user_id: form.get("user_id") ?? "",
  user_name: form.get("user_name") ?? "",
  team_id: form.get("team_id") ?? "",
  response_url: form.get("response_url") ?? "",
  trigger_id: form.get("trigger_id") ?? "",
};

const known = ["start", "update", "action", "summarize", "rip", "archive"];

let ackText: string;
if (!subcommand) {
  ackText =
    "Usage: `/incident <start|update|action|summarize|rip|archive> [args]`";
} else if (!known.includes(subcommand)) {
  ackText = `Unknown subcommand \`${subcommand}\`. Try: ${known
    .map((k) => `\`${k}\``)
    .join(", ")}`;
} else {
  const acks: Record<string, string> = {
    start: ":rotating_light: Spinning up the incident…",
    update: ":pencil: Logging your update…",
    action: ":ballot_box_with_check: Logging the action item…",
    summarize: ":brain: Summarizing the channel for the PIR…",
    rip: ":package: Creating RIP tickets from action items…",
    archive: ":package: Archiving the channel…",
  };
  ackText = acks[subcommand];
}

const responseBody = JSON.stringify({
  response_type: "ephemeral",
  text: ackText,
  payload,
});

const httpResponse = [
  "HTTP/1.1 200 OK",
  "Content-Type: application/json",
  `Content-Length: ${Buffer.byteLength(responseBody)}`,
  "",
  responseBody,
].join("\r\n");

process.stdout.write(httpResponse);
