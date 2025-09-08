import type { Schema, Struct } from '@strapi/strapi';

export interface AssociationsOfficeBearer extends Struct.ComponentSchema {
  collectionName: 'components_associations_office_bearers';
  info: {
    displayName: 'office-bearer';
  };
  attributes: {
    gender: Schema.Attribute.Enumeration<['male', 'female']>;
    order: Schema.Attribute.Integer;
    personName: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    roleTitle: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
  };
}

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
    description: '';
    displayName: 'commissionBlock ';
    icon: 'apps';
  };
  attributes: {
    commissionTitle: Schema.Attribute.String & Schema.Attribute.Required;
    convenor: Schema.Attribute.String & Schema.Attribute.Required;
    subCommissions: Schema.Attribute.Component<'shared.commission', true> &
      Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'social-link';
  };
  attributes: {
    label: Schema.Attribute.String &
      Schema.Attribute.SetPluginOptions<{
        i18n: {
          localized: true;
        };
      }>;
    platform: Schema.Attribute.Enumeration<
      ['facebook2', 'instagram2', 'youtube2', 'website', 'other']
    > &
      Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'associations.office-bearer': AssociationsOfficeBearer;
      'shared.commission': SharedCommission;
      'shared.commission-block': SharedCommissionBlock;
      'shared.social-link': SharedSocialLink;
    }
  }
}
