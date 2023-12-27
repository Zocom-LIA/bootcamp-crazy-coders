export const bodySchema = {
  type: "object",
  properties: {
    selection: {
      type: "array",
      minItems: 1,
      items: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 1, maxLength: 50 },
          count: { type: "number", minimum: 1, maximum: 100 },
          totalPrice: { type: "number", minimum: 1, maximum: 999 },
        },
        required: ["name", "count", "totalPrice"],
      },
    },
    customerId: { type: "string", minLength: 1, maxLength: 50 },
    totalSum: { type: "number", minimum: 1 },
  },
  required: ["selection", "totalSum"],
} as const;

export const schema = {
  type: "object",
  properties: {
    body: bodySchema,
  },
} as const;
