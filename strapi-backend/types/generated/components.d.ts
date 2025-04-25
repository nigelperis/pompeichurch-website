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

export interface SharedCommissionBlock extends Struct.ComponentSchema {
  collectionName: 'components_shared_commission_block_s';
  info: {
    displayName: 'Commission Block ';
    icon: 'apps';
  };
  attributes: {
    commissionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    convenor: Schema.Attribute.String & Schema.Attribute.Required;
    subCommissions: Schema.Attribute.Component<'shared.commission', true> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.commission': SharedCommission;
      'shared.commission-block': SharedCommissionBlock;
    }
  }
}
