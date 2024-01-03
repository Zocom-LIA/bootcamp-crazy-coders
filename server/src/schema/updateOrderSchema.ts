export const bodySchema = {
  type: "object",
  properties: {
    customerId: { type: "string", minLength: 1, maxLength: 50 },
    orderId: { type: "string", minLength: 1, maxLength: 50 },
  },
  required: ["customerId", "orderId"],
} as const;

export const schema = {
  type: "object",
  properties: {
    body: bodySchema,
  },
} as const;
