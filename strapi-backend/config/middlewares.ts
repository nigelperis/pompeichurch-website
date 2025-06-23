export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::query",
  {
    name: "strapi::body",
    config: {
      formLimit: "300mb",
      jsonLimit: "300mb",
      textLimit: "300mb",
      formidable: {
        maxFileSize: 300 * 1024 * 1024,
      },
    },
  },
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
