Webhook route `POST /new-hire-machine-order`, authenticated by `external_id` (call it with the
route's `external_id` query parameter).

Request body:

```json
{
  "new_hire_name": "Alex Chen",
  "new_hire_email": "alex@example.com",
  "start_date": "2025-07-14",
  "manager": "dana@example.com",
  "department": "Sales",
  "machine": "macbook-air-13",
  "accessories": ["monitor-27", "dock"],
  "shipping_address": "12 Main St, Dublin 2",
  "notes": "Needs it a week early for training"
}
```

Required: `new_hire_name`, `start_date`, `manager`, `machine`, `shipping_address`.

Machines: `macbook-pro-14`, `macbook-air-13`, `dell-xps-15`.
Accessories: `monitor-27`, `dock`, `keyboard-mouse`, `headset`, `laptop-bag`.

Responds `202 Accepted` with the normalized order (including a generated `order_id`), `400` for a bad
payload, or `405` for a non-POST request with the catalog attached. Only the `202` body is intended
for downstream use; a rejection stops at Jira with a parse failure, which is the desired signal.
