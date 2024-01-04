export const pathSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
} as const;

export const schema = {
  type: "object",
  properties: {
    pathParameters: pathSchema,
  },
} as const;
