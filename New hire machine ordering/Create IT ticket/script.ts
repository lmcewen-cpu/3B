// Change these two values to match your Jira project.
const PROJECT_KEY = "IT";
const ISSUE_TYPE = "Task";

type Item = { id: string; label: string; specs: string };
type Order = {
  order_id: string;
  new_hire: { name: string; email: string | null; start_date: string; department: string | null };
  manager: string;
  machine: Item;
  accessories: Item[];
  shipping_address: string;
  notes: string | null;
};

const raw = await Bun.stdin.text();
const separator = raw.indexOf("\r\n\r\n");
const payload = raw.startsWith("HTTP/") && separator !== -1 ? raw.slice(separator + 4) : raw;

let order: Order;
try {
  order = JSON.parse(payload) as Order;
} catch {
  console.error("Upstream payload was not JSON:\n" + payload.slice(0, 2000));
  process.exit(1);
}

const domain = process.env.JIRA_DOMAIN;
if (!domain) {
  console.error("JIRA_DOMAIN is not set — attach the Jira connector to this step.");
  process.exit(1);
}

const accessoryLines =
  order.accessories.length > 0
    ? order.accessories.map((a) => `- ${a.label} (${a.specs})`).join("\n")
    : "- None requested";

const description = [
  `Order ID: ${order.order_id}`,
  `New hire: ${order.new_hire.name}${order.new_hire.email ? ` <${order.new_hire.email}>` : ""}`,
  `Start date: ${order.new_hire.start_date}`,
  `Department: ${order.new_hire.department ?? "Not provided"}`,
  `Requesting manager: ${order.manager}`,
  "",
  `Machine: ${order.machine.label} — ${order.machine.specs}`,
  "Accessories:",
  accessoryLines,
  "",
  `Ship to: ${order.shipping_address}`,
  `Notes: ${order.notes ?? "None"}`,
].join("\n");

const response = await fetch(`https://${domain}/rest/api/3/issue`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  body: JSON.stringify({
    fields: {
      project: { key: PROJECT_KEY },
      issuetype: { name: ISSUE_TYPE },
      summary: `New hire machine order — ${order.new_hire.name} (start ${order.new_hire.start_date})`,
      description: {
        type: "doc",
        version: 1,
        content: description
          .split("\n")
          .map((line) => ({
            type: "paragraph",
            content: line === "" ? [] : [{ type: "text", text: line }],
          })),
      },
      labels: ["new-hire", "hardware", order.machine.id],
    },
  }),
});

const text = await response.text();
if (!response.ok) {
  console.error(`Jira returned ${response.status}: ${text.slice(0, 2000)}`);
  process.exit(1);
}

const issue = JSON.parse(text) as { key: string };
console.log(
  JSON.stringify({
    order_id: order.order_id,
    issue_key: issue.key,
    issue_url: `https://${domain}/browse/${issue.key}`,
    new_hire: order.new_hire.name,
    machine: order.machine.label,
  }),
);
