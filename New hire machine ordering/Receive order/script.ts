type Catalog = { id: string; label: string; specs: string };

const MACHINES: Catalog[] = [
  { id: "macbook-pro-14", label: 'MacBook Pro 14"', specs: "M4 Pro, 24GB RAM, 512GB SSD" },
  { id: "macbook-air-13", label: 'MacBook Air 13"', specs: "M4, 16GB RAM, 512GB SSD" },
  { id: "dell-xps-15", label: "Dell XPS 15", specs: "Core Ultra 7, 32GB RAM, 1TB SSD" },
];

const ACCESSORIES: Catalog[] = [
  { id: "monitor-27", label: '27" 4K monitor', specs: "USB-C, height adjustable" },
  { id: "dock", label: "USB-C dock", specs: "Dual display, 100W PD" },
  { id: "keyboard-mouse", label: "Keyboard and mouse", specs: "Wireless set" },
  { id: "headset", label: "Headset", specs: "Noise cancelling, USB-C" },
  { id: "laptop-bag", label: "Laptop bag", specs: "Standard issue" },
];

function respond(status: string, body: unknown): never {
  const payload = JSON.stringify(body);
  process.stdout.write(
    `HTTP/1.1 ${status}\r\nContent-Type: application/json\r\nContent-Length: ${Buffer.byteLength(payload)}\r\n\r\n${payload}`,
  );
  process.exit(0);
}

const raw = await Bun.stdin.text();
const separator = raw.indexOf("\r\n\r\n");
const head = separator === -1 ? raw : raw.slice(0, separator);
const body = separator === -1 ? "" : raw.slice(separator + 4);
const method = head.split("\r\n")[0]?.split(" ")[0]?.toUpperCase() ?? "";

if (method !== "POST") {
  respond("405 Method Not Allowed", {
    error: "Send a POST request with a JSON order payload.",
    machines: MACHINES,
    accessories: ACCESSORIES,
  });
}

let input: Record<string, unknown>;
try {
  input = JSON.parse(body) as Record<string, unknown>;
} catch {
  respond("400 Bad Request", { error: "Request body must be JSON." });
}

const text = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

const order = {
  newHireName: text(input.new_hire_name ?? input.newHireName ?? input.name),
  newHireEmail: text(input.new_hire_email ?? input.newHireEmail ?? input.email),
  startDate: text(input.start_date ?? input.startDate),
  manager: text(input.manager ?? input.manager_email ?? input.managerEmail),
  department: text(input.department ?? input.team),
  machineId: text(input.machine ?? input.machine_id ?? input.machineId).toLowerCase(),
  shippingAddress: text(input.shipping_address ?? input.shippingAddress ?? input.office),
  notes: text(input.notes),
  accessoryIds: Array.isArray(input.accessories)
    ? input.accessories.filter((a): a is string => typeof a === "string").map((a) => a.trim().toLowerCase())
    : [],
};

const missing = (
  [
    ["new_hire_name", order.newHireName],
    ["start_date", order.startDate],
    ["manager", order.manager],
    ["machine", order.machineId],
    ["shipping_address", order.shippingAddress],
  ] as const
).filter(([, value]) => value === "").map(([field]) => field);

if (missing.length > 0) {
  respond("400 Bad Request", { error: "Missing required fields.", missing });
}

const machine = MACHINES.find((m) => m.id === order.machineId);
if (!machine) {
  respond("400 Bad Request", {
    error: `Unknown machine "${order.machineId}".`,
    valid_machines: MACHINES.map((m) => m.id),
  });
}

const unknownAccessories = order.accessoryIds.filter((id) => !ACCESSORIES.some((a) => a.id === id));
if (unknownAccessories.length > 0) {
  respond("400 Bad Request", {
    error: "Unknown accessories.",
    unknown: unknownAccessories,
    valid_accessories: ACCESSORIES.map((a) => a.id),
  });
}

const accessories = ACCESSORIES.filter((a) => order.accessoryIds.includes(a.id));
const orderId = `NHM-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomUUID().slice(0, 8)}`;

respond("202 Accepted", {
  order_id: orderId,
  status: "accepted",
  received_at: new Date().toISOString(),
  new_hire: {
    name: order.newHireName,
    email: order.newHireEmail || null,
    start_date: order.startDate,
    department: order.department || null,
  },
  manager: order.manager,
  machine,
  accessories,
  shipping_address: order.shippingAddress,
  notes: order.notes || null,
});
