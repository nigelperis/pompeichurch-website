export default ({ env }) => ({
  host: env("HOST", "0.0.0.0"),
  port: env.int("PORT", 1337),
  app: {
    keys: env.array("APP_KEYS"),
  },
  webhooks: {
    populateRelations: env.bool("WEBHOOKS_POPULATE_RELATIONS", false),
  },
  parser: {
    enabled: true,
    multipart: true,
    formidable: {
      maxFileSize: 300 * 1024 * 1024, // 300MB
      maxFieldsSize: 300 * 1024 * 1024,
    },
  },
});
