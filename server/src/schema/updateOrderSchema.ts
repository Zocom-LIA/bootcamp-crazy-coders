import { OrderStatus } from "@yumtypes/index.js";

export const bodySchema = {
  type: "object",
  properties: {
    customerId: { type: "string", minLength: 1, maxLength: 50 },
    status: { type: "string", enum: Object.values(OrderStatus) },
  },
  required: ["customerId", "status"],
} as const;

export const schema = {
  type: "object",
  properties: {
    body: bodySchema,
  },
} as const;
