export const bodySchema = {
  type: "object",
  properties: {
    username: { type: "string", minLength: 3, maxLength: 50 },
    password: { type: "string", minLength: 6, maxLength: 50 },
  },
  required: ["username", "password"],
} as const;

export const schema = {
  type: "object",
  properties: {
    body: bodySchema,
  },
} as const;
