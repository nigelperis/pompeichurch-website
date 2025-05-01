import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCommission extends Struct.ComponentSchema {
  collectionName: 'components_shared_commissions';
  info: {
    displayName: 'commission';
    icon: 'apps';
  };
  attributes: {
    secretary: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.commission': SharedCommission;
    }
  }
}
