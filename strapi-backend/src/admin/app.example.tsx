import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
