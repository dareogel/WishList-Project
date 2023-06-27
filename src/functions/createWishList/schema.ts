export default {
  type: "object",
  properties: {
    SITE: { type: "string" },
    SITE_NAME: { type: "string" },
    PRICE: { type: "string" },
    SITE_URL: { type: "string" },
  },
  required: ["SITE_NAME"],
} as const;
