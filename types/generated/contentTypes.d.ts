import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1;
      }>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiArticleArticle extends Schema.CollectionType {
  collectionName: 'articles';
  info: {
    singularName: 'article';
    pluralName: 'articles';
    displayName: 'Article';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    slug: Attribute.UID<'api::article.article', 'title'>;
    content: Attribute.RichText;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::article.article',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBannerBanner extends Schema.CollectionType {
  collectionName: 'banners';
  info: {
    singularName: 'banner';
    pluralName: 'banners';
    displayName: 'banner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    boldText: Attribute.String;
    Paragraph: Attribute.String;
    underline_word: Attribute.String;
    url: Attribute.String;
    font_awsome_Icon_name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::banner.banner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBookMeetingBookMeeting extends Schema.CollectionType {
  collectionName: 'book_meetings';
  info: {
    singularName: 'book-meeting';
    pluralName: 'book-meetings';
    displayName: '0_ common / BookMeeting';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    request_demonstration: Attribute.String & Attribute.Required;
    message: Attribute.Text & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::book-meeting.book-meeting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::book-meeting.book-meeting',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpMultipleStockKeepingLocationBpMultipleStockKeepingLocation
  extends Schema.CollectionType {
  collectionName: 'bp_multiple_stock_keeping_locations';
  info: {
    singularName: 'bp-multiple-stock-keeping-location';
    pluralName: 'bp-multiple-stock-keeping-locations';
    displayName: '5.2_business / MultipleStockKeepingLocation';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    main_title: Attribute.String & Attribute.Required;
    moosways: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location',
      'oneToMany',
      'api::bp-multiple-stock-keeping-location-moosway.bp-multiple-stock-keeping-location-moosway'
    >;
    oldways: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location',
      'oneToMany',
      'api::bp-multiple-stock-keeping-location-oldway.bp-multiple-stock-keeping-location-oldway'
    >;
    pill_image: Attribute.Media;
    percentage: Attribute.String;
    percentage_description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpMultipleStockKeepingLocationMooswayBpMultipleStockKeepingLocationMoosway
  extends Schema.CollectionType {
  collectionName: 'bp_multiple_stock_keeping_location_moosways';
  info: {
    singularName: 'bp-multiple-stock-keeping-location-moosway';
    pluralName: 'bp-multiple-stock-keeping-location-moosways';
    displayName: '5.2.1_business / MultipleStockKeepingLocation / moosway';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    moosway: Attribute.String & Attribute.Required;
    bp_location: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location-moosway.bp-multiple-stock-keeping-location-moosway',
      'manyToOne',
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location-moosway.bp-multiple-stock-keeping-location-moosway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location-moosway.bp-multiple-stock-keeping-location-moosway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpMultipleStockKeepingLocationOldwayBpMultipleStockKeepingLocationOldway
  extends Schema.CollectionType {
  collectionName: 'bp_multiple_stock_keeping_location_oldways';
  info: {
    singularName: 'bp-multiple-stock-keeping-location-oldway';
    pluralName: 'bp-multiple-stock-keeping-location-oldways';
    displayName: '5.2.2_business / MultipleStockKeepingLocation / oldway';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    oldway: Attribute.String;
    bp_location: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location-oldway.bp-multiple-stock-keeping-location-oldway',
      'manyToOne',
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location-oldway.bp-multiple-stock-keeping-location-oldway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-multiple-stock-keeping-location-oldway.bp-multiple-stock-keeping-location-oldway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpUnmanagedFlowchartBpUnmanagedFlowchart
  extends Schema.CollectionType {
  collectionName: 'bp_unmanaged_flowcharts';
  info: {
    singularName: 'bp-unmanaged-flowchart';
    pluralName: 'bp-unmanaged-flowcharts';
    displayName: '3.2_business / unmanageRetail / flowchart';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    main_title: Attribute.String & Attribute.Required;
    moosways: Attribute.Relation<
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart',
      'oneToMany',
      'api::moosway.moosway'
    >;
    oldways: Attribute.Relation<
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart',
      'oneToMany',
      'api::oldway.oldway'
    >;
    pill_image: Attribute.Media;
    percentage: Attribute.String;
    percentage_description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpWarehousingOpsFlowchartBpWarehousingOpsFlowchart
  extends Schema.CollectionType {
  collectionName: 'bp_warehousing_ops_flowcharts';
  info: {
    singularName: 'bp-warehousing-ops-flowchart';
    pluralName: 'bp-warehousing-ops-flowcharts';
    displayName: '4.2_business / Warehousing_Ops / flowchart';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    main_title: Attribute.String & Attribute.Required;
    moosways: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart',
      'oneToMany',
      'api::bp-warehousing-ops-flowchart-moosway.bp-warehousing-ops-flowchart-moosway'
    >;
    oldways: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart',
      'oneToMany',
      'api::bp-warehousing-ops-flowchart-oldway.bp-warehousing-ops-flowchart-oldway'
    >;
    pill_image: Attribute.Media;
    percentage: Attribute.String;
    percentage_description: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpWarehousingOpsFlowchartMooswayBpWarehousingOpsFlowchartMoosway
  extends Schema.CollectionType {
  collectionName: 'bp_warehousing_ops_flowchart_moosways';
  info: {
    singularName: 'bp-warehousing-ops-flowchart-moosway';
    pluralName: 'bp-warehousing-ops-flowchart-moosways';
    displayName: '4.2.1_business / Warehousing_Ops / flowchart / moosway';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    moosway: Attribute.String;
    flowchart: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart-moosway.bp-warehousing-ops-flowchart-moosway',
      'manyToOne',
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart-moosway.bp-warehousing-ops-flowchart-moosway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart-moosway.bp-warehousing-ops-flowchart-moosway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBpWarehousingOpsFlowchartOldwayBpWarehousingOpsFlowchartOldway
  extends Schema.CollectionType {
  collectionName: 'bp_warehousing_ops_flowchart_oldways';
  info: {
    singularName: 'bp-warehousing-ops-flowchart-oldway';
    pluralName: 'bp-warehousing-ops-flowchart-oldways';
    displayName: '4.2.2_business / Warehousing_Ops / flowchart / oldway';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    old_way: Attribute.String;
    flowchart: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart-oldway.bp-warehousing-ops-flowchart-oldway',
      'manyToOne',
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart-oldway.bp-warehousing-ops-flowchart-oldway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::bp-warehousing-ops-flowchart-oldway.bp-warehousing-ops-flowchart-oldway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessPageTitleBusinessPageTitle
  extends Schema.CollectionType {
  collectionName: 'business_page_titles';
  info: {
    singularName: 'business-page-title';
    pluralName: 'business-page-titles';
    displayName: '3.0_business / flowcharts / Title';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-page-title.business-page-title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-page-title.business-page-title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessPageUmnamageRetailGetStartedBusinessPageUmnamageRetailGetStarted
  extends Schema.CollectionType {
  collectionName: 'business_page_umnamage_retail_get_starteds';
  info: {
    singularName: 'business-page-umnamage-retail-get-started';
    pluralName: 'business-page-umnamage-retail-get-starteds';
    displayName: '3.3_business / umnamageRetail  / getStarted';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    number: Attribute.Integer & Attribute.Required;
    Paragraph: Attribute.Text & Attribute.Required;
    BelongTo: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-page-umnamage-retail-get-started.business-page-umnamage-retail-get-started',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-page-umnamage-retail-get-started.business-page-umnamage-retail-get-started',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessPageUnmanageRetailTitleCardBusinessPageUnmanageRetailTitleCard
  extends Schema.CollectionType {
  collectionName: 'business_page_unmanage_retail_title_cards';
  info: {
    singularName: 'business-page-unmanage-retail-title-card';
    pluralName: 'business-page-unmanage-retail-title-cards';
    displayName: '3.1_business / unmanageRetail / titleCard';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sub_topic: Attribute.String;
    main_title: Attribute.Relation<
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card',
      'manyToOne',
      'api::title.title'
    >;
    points: Attribute.Relation<
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card',
      'oneToMany',
      'api::businesspage-umnamage-retail-titlecard-point.businesspage-umnamage-retail-titlecard-point'
    >;
    image_url: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinesspageUmnamageRetailTitlecardPointBusinesspageUmnamageRetailTitlecardPoint
  extends Schema.CollectionType {
  collectionName: 'businesspage_umnamage_retail_titlecard_points';
  info: {
    singularName: 'businesspage-umnamage-retail-titlecard-point';
    pluralName: 'businesspage-umnamage-retail-titlecard-points';
    displayName: '3.1.1_business / umnamageRetail / Titlecard / point';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    point: Attribute.String & Attribute.Required;
    card: Attribute.Relation<
      'api::businesspage-umnamage-retail-titlecard-point.businesspage-umnamage-retail-titlecard-point',
      'manyToOne',
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::businesspage-umnamage-retail-titlecard-point.businesspage-umnamage-retail-titlecard-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::businesspage-umnamage-retail-titlecard-point.businesspage-umnamage-retail-titlecard-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCardViewCardView extends Schema.CollectionType {
  collectionName: 'card_views';
  info: {
    singularName: 'card-view';
    pluralName: 'card-views';
    displayName: '1.5_home / CardView';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    ImageUrl: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::card-view.card-view',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::card-view.card-view',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCommonJoinWithUsCommonJoinWithUs
  extends Schema.CollectionType {
  collectionName: 'common_join_with_uses';
  info: {
    singularName: 'common-join-with-us';
    pluralName: 'common-join-with-uses';
    displayName: '0_ common / JoinWithUs';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    position: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    email: Attribute.Email & Attribute.Required;
    linkedIn_profile: Attribute.String & Attribute.Required;
    upload_resume: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::common-join-with-us.common-join-with-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::common-join-with-us.common-join-with-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterFooter extends Schema.CollectionType {
  collectionName: 'footers';
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: '0.2.1_common / footer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    image: Attribute.Media;
    footer_term_and_conditions: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer-term-and-condition.footer-term-and-condition'
    >;
    footer_pages: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer-page.footer-page'
    >;
    footer_contacts: Attribute.Relation<
      'api::footer.footer',
      'oneToMany',
      'api::footer-contact.footer-contact'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterContactFooterContact extends Schema.CollectionType {
  collectionName: 'footer_contacts';
  info: {
    singularName: 'footer-contact';
    pluralName: 'footer-contacts';
    displayName: '0.2.4_common / footer / contact';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Attribute.Text;
    telephone_number: Attribute.String;
    email: Attribute.Email;
    copyright: Attribute.String;
    WEARE_MOOS: Attribute.Relation<
      'api::footer-contact.footer-contact',
      'oneToMany',
      'api::footer-contact-we-are.footer-contact-we-are'
    >;
    footer: Attribute.Relation<
      'api::footer-contact.footer-contact',
      'manyToOne',
      'api::footer.footer'
    >;
    fontawsome_phone_icon_name: Attribute.String;
    fontawsome_email_icon_name: Attribute.String;
    fontawsome_copyright_icon_name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-contact.footer-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-contact.footer-contact',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterContactWeAreFooterContactWeAre
  extends Schema.CollectionType {
  collectionName: 'footer_contact_we_ares';
  info: {
    singularName: 'footer-contact-we-are';
    pluralName: 'footer-contact-we-ares';
    displayName: '0.2.5_Common / footer / contact / weAre';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    link: Attribute.String;
    footer_contact: Attribute.Relation<
      'api::footer-contact-we-are.footer-contact-we-are',
      'manyToOne',
      'api::footer-contact.footer-contact'
    >;
    fontawsome_icon_name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-contact-we-are.footer-contact-we-are',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-contact-we-are.footer-contact-we-are',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterPageFooterPage extends Schema.CollectionType {
  collectionName: 'footer_pages';
  info: {
    singularName: 'footer-page';
    pluralName: 'footer-pages';
    displayName: '0.2.3_Common / footer / page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    page: Attribute.String;
    footer: Attribute.Relation<
      'api::footer-page.footer-page',
      'manyToOne',
      'api::footer.footer'
    >;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-page.footer-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-page.footer-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiFooterTermAndConditionFooterTermAndCondition
  extends Schema.CollectionType {
  collectionName: 'footer_term_and_conditions';
  info: {
    singularName: 'footer-term-and-condition';
    pluralName: 'footer-term-and-conditions';
    displayName: '0.2.2_Common / footer / termAndCondition ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    footer: Attribute.Relation<
      'api::footer-term-and-condition.footer-term-and-condition',
      'manyToOne',
      'api::footer.footer'
    >;
    name: Attribute.String;
    url_link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer-term-and-condition.footer-term-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::footer-term-and-condition.footer-term-and-condition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiImageImage extends Schema.CollectionType {
  collectionName: 'images';
  info: {
    singularName: 'image';
    pluralName: 'images';
    displayName: '1.1_ home / Image';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    ImageUrl: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::image.image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::image.image',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLearnMoreCardLearnMoreCard extends Schema.CollectionType {
  collectionName: 'learn_more_cards';
  info: {
    singularName: 'learn-more-card';
    pluralName: 'learn-more-cards';
    displayName: '1.2_home / LearnMoreCard';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    learn_more_card_arrays: Attribute.Relation<
      'api::learn-more-card.learn-more-card',
      'oneToMany',
      'api::learn-more-card-array.learn-more-card-array'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::learn-more-card.learn-more-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::learn-more-card.learn-more-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLearnMoreCardArrayLearnMoreCardArray
  extends Schema.CollectionType {
  collectionName: 'learn_more_card_arrays';
  info: {
    singularName: 'learn-more-card-array';
    pluralName: 'learn-more-card-arrays';
    displayName: '1.2.1_home / LearnMoreCard / Array ';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    blogs: Attribute.String;
    learn_more_card: Attribute.Relation<
      'api::learn-more-card-array.learn-more-card-array',
      'manyToOne',
      'api::learn-more-card.learn-more-card'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::learn-more-card-array.learn-more-card-array',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::learn-more-card-array.learn-more-card-array',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMooswayMoosway extends Schema.CollectionType {
  collectionName: 'moosways';
  info: {
    singularName: 'moosway';
    pluralName: 'moosways';
    displayName: '3.2.1 business / unmanageRetail / flowchart / moosway / point';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    moosway_point: Attribute.String & Attribute.Required;
    bp_unmanaged_flowchart: Attribute.Relation<
      'api::moosway.moosway',
      'manyToOne',
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::moosway.moosway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::moosway.moosway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNavbarNavbar extends Schema.CollectionType {
  collectionName: 'navbars';
  info: {
    singularName: 'navbar';
    pluralName: 'navbars';
    displayName: '0.1.1_common / navbar';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    nav_title: Attribute.String;
    navbar_sub_topics: Attribute.Relation<
      'api::navbar.navbar',
      'oneToMany',
      'api::navbar-sub-topic.navbar-sub-topic'
    >;
    url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navbar.navbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navbar.navbar',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNavbarRightSideNavbarRightSide
  extends Schema.CollectionType {
  collectionName: 'navbar_right_sides';
  info: {
    singularName: 'navbar-right-side';
    pluralName: 'navbar-right-sides';
    displayName: '0.1.3_common / navbar / rightSide';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    url: Attribute.String;
    type: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navbar-right-side.navbar-right-side',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navbar-right-side.navbar-right-side',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNavbarSubTopicNavbarSubTopic extends Schema.CollectionType {
  collectionName: 'navbar_sub_topics';
  info: {
    singularName: 'navbar-sub-topic';
    pluralName: 'navbar-sub-topics';
    displayName: '0.1.2_common / navbar / subTopic';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    navbar: Attribute.Relation<
      'api::navbar-sub-topic.navbar-sub-topic',
      'manyToOne',
      'api::navbar.navbar'
    >;
    font_awsome_Icon_name: Attribute.String;
    url: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::navbar-sub-topic.navbar-sub-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::navbar-sub-topic.navbar-sub-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOldwayOldway extends Schema.CollectionType {
  collectionName: 'oldways';
  info: {
    singularName: 'oldway';
    pluralName: 'oldways';
    displayName: '3.2.2_business / unmanageRetail / flowchart / oldway / point';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    old_way_point: Attribute.String & Attribute.Required;
    bp_unmanaged_flowchart: Attribute.Relation<
      'api::oldway.oldway',
      'manyToOne',
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::oldway.oldway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::oldway.oldway',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOurCompanyPageJobVacancyOurCompanyPageJobVacancy
  extends Schema.CollectionType {
  collectionName: 'our_company_page_job_vacancies';
  info: {
    singularName: 'our-company-page-job-vacancy';
    pluralName: 'our-company-page-job-vacancies';
    displayName: '7.2_ourCompany / JobVacancy';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    job_title: Attribute.String & Attribute.Required;
    qualifications: Attribute.Relation<
      'api::our-company-page-job-vacancy.our-company-page-job-vacancy',
      'oneToMany',
      'api::our-company-page-job-vacancy-qualification.our-company-page-job-vacancy-qualification'
    >;
    link: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::our-company-page-job-vacancy.our-company-page-job-vacancy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::our-company-page-job-vacancy.our-company-page-job-vacancy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOurCompanyPageJobVacancyQualificationOurCompanyPageJobVacancyQualification
  extends Schema.CollectionType {
  collectionName: 'our_company_page_job_vacancy_qualifications';
  info: {
    singularName: 'our-company-page-job-vacancy-qualification';
    pluralName: 'our-company-page-job-vacancy-qualifications';
    displayName: '7.2.1_ourCompany / JobVacancy / Qualification';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    qualification: Attribute.String & Attribute.Required;
    vacancy: Attribute.Relation<
      'api::our-company-page-job-vacancy-qualification.our-company-page-job-vacancy-qualification',
      'manyToOne',
      'api::our-company-page-job-vacancy.our-company-page-job-vacancy'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::our-company-page-job-vacancy-qualification.our-company-page-job-vacancy-qualification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::our-company-page-job-vacancy-qualification.our-company-page-job-vacancy-qualification',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOurCompanyPageMeetOurTeamOurCompanyPageMeetOurTeam
  extends Schema.CollectionType {
  collectionName: 'our_company_page_meet_our_teams';
  info: {
    singularName: 'our-company-page-meet-our-team';
    pluralName: 'our-company-page-meet-our-teams';
    displayName: '7.3_ourCompany / MeetOurTeam';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    position: Attribute.String & Attribute.Required;
    image: Attribute.Media & Attribute.Required;
    LinkedIn: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::our-company-page-meet-our-team.our-company-page-meet-our-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::our-company-page-meet-our-team.our-company-page-meet-our-team',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOurCompanyPageTitleCardOurCompanyPageTitleCard
  extends Schema.CollectionType {
  collectionName: 'our_company_page_title_cards';
  info: {
    singularName: 'our-company-page-title-card';
    pluralName: 'our-company-page-title-cards';
    displayName: '7.1_ourCompany / Title';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    sub_title: Attribute.String;
    image_url: Attribute.Media;
    common_title: Attribute.Relation<
      'api::our-company-page-title-card.our-company-page-title-card',
      'oneToOne',
      'api::title.title'
    >;
    points: Attribute.Relation<
      'api::our-company-page-title-card.our-company-page-title-card',
      'oneToMany',
      'api::our-company-page-title-point.our-company-page-title-point'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::our-company-page-title-card.our-company-page-title-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::our-company-page-title-card.our-company-page-title-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOurCompanyPageTitlePointOurCompanyPageTitlePoint
  extends Schema.CollectionType {
  collectionName: 'our_company_page_title_points';
  info: {
    singularName: 'our-company-page-title-point';
    pluralName: 'our-company-page-title-points';
    displayName: '7.1.1_ourCompany / Title / Point';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bullet_point: Attribute.String;
    card: Attribute.Relation<
      'api::our-company-page-title-point.our-company-page-title-point',
      'manyToOne',
      'api::our-company-page-title-card.our-company-page-title-card'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::our-company-page-title-point.our-company-page-title-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::our-company-page-title-point.our-company-page-title-point',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPagePage extends Schema.CollectionType {
  collectionName: 'pages';
  info: {
    singularName: 'page';
    pluralName: 'pages';
    displayName: 'HomePage_Page';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    slug: Attribute.UID<'api::page.page', 'title'> & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::page.page', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPartnerPartner extends Schema.CollectionType {
  collectionName: 'partners';
  info: {
    singularName: 'partner';
    pluralName: 'partners';
    displayName: '1.3_home / Partner';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.String & Attribute.Required;
    imageUrl: Attribute.Media & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::partner.partner',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiQuoteQuote extends Schema.CollectionType {
  collectionName: 'quotes';
  info: {
    singularName: 'quote';
    pluralName: 'quotes';
    displayName: '1.4_home / Quote';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Quote: Attribute.String & Attribute.Required;
    Speaker: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::quote.quote',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: '2.1_services / Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    boldtext: Attribute.String;
    ComTitle: Attribute.String;
    CardTitle: Attribute.String;
    Paragraph: Attribute.Text;
    imageUrl: Attribute.Media & Attribute.Required;
    service_card_bodies: Attribute.Relation<
      'api::service.service',
      'oneToMany',
      'api::service-card-body.service-card-body'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceCardBodyServiceCardBody
  extends Schema.CollectionType {
  collectionName: 'service_card_bodies';
  info: {
    singularName: 'service-card-body';
    pluralName: 'service-card-bodies';
    displayName: '2.1.1_service / CardBody';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ListItems: Attribute.String;
    service: Attribute.Relation<
      'api::service-card-body.service-card-body',
      'manyToOne',
      'api::service.service'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service-card-body.service-card-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service-card-body.service-card-body',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechnologyPageTechnologyPage extends Schema.CollectionType {
  collectionName: 'technology_pages';
  info: {
    singularName: 'technology-page';
    pluralName: 'technology-pages';
    displayName: '6.1_technology / Title';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    description: Attribute.String;
    ImageUrl: Attribute.Media & Attribute.Required;
    title: Attribute.Relation<
      'api::technology-page.technology-page',
      'oneToOne',
      'api::title.title'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::technology-page.technology-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::technology-page.technology-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTechnologyPageProcessCardTechnologyPageProcessCard
  extends Schema.CollectionType {
  collectionName: 'technology_page_process_cards';
  info: {
    singularName: 'technology-page-process-card';
    pluralName: 'technology-page-process-cards';
    displayName: '6.2_technology / ProcessCard';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    sub_title: Attribute.Text;
    imageUrl: Attribute.Media;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::technology-page-process-card.technology-page-process-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::technology-page-process-card.technology-page-process-card',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTitleTitle extends Schema.CollectionType {
  collectionName: 'titles';
  info: {
    singularName: 'title';
    pluralName: 'titles';
    displayName: '0_ common / Title';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    CommonTitle: Attribute.String;
    boldText: Attribute.String;
    Paragraph: Attribute.String;
    BelongTo: Attribute.String & Attribute.Required & Attribute.Unique;
    business_page_unmanage_retail_title_cards: Attribute.Relation<
      'api::title.title',
      'oneToMany',
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::title.title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::title.title',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'api::article.article': ApiArticleArticle;
      'api::banner.banner': ApiBannerBanner;
      'api::book-meeting.book-meeting': ApiBookMeetingBookMeeting;
      'api::bp-multiple-stock-keeping-location.bp-multiple-stock-keeping-location': ApiBpMultipleStockKeepingLocationBpMultipleStockKeepingLocation;
      'api::bp-multiple-stock-keeping-location-moosway.bp-multiple-stock-keeping-location-moosway': ApiBpMultipleStockKeepingLocationMooswayBpMultipleStockKeepingLocationMoosway;
      'api::bp-multiple-stock-keeping-location-oldway.bp-multiple-stock-keeping-location-oldway': ApiBpMultipleStockKeepingLocationOldwayBpMultipleStockKeepingLocationOldway;
      'api::bp-unmanaged-flowchart.bp-unmanaged-flowchart': ApiBpUnmanagedFlowchartBpUnmanagedFlowchart;
      'api::bp-warehousing-ops-flowchart.bp-warehousing-ops-flowchart': ApiBpWarehousingOpsFlowchartBpWarehousingOpsFlowchart;
      'api::bp-warehousing-ops-flowchart-moosway.bp-warehousing-ops-flowchart-moosway': ApiBpWarehousingOpsFlowchartMooswayBpWarehousingOpsFlowchartMoosway;
      'api::bp-warehousing-ops-flowchart-oldway.bp-warehousing-ops-flowchart-oldway': ApiBpWarehousingOpsFlowchartOldwayBpWarehousingOpsFlowchartOldway;
      'api::business-page-title.business-page-title': ApiBusinessPageTitleBusinessPageTitle;
      'api::business-page-umnamage-retail-get-started.business-page-umnamage-retail-get-started': ApiBusinessPageUmnamageRetailGetStartedBusinessPageUmnamageRetailGetStarted;
      'api::business-page-unmanage-retail-title-card.business-page-unmanage-retail-title-card': ApiBusinessPageUnmanageRetailTitleCardBusinessPageUnmanageRetailTitleCard;
      'api::businesspage-umnamage-retail-titlecard-point.businesspage-umnamage-retail-titlecard-point': ApiBusinesspageUmnamageRetailTitlecardPointBusinesspageUmnamageRetailTitlecardPoint;
      'api::card-view.card-view': ApiCardViewCardView;
      'api::common-join-with-us.common-join-with-us': ApiCommonJoinWithUsCommonJoinWithUs;
      'api::footer.footer': ApiFooterFooter;
      'api::footer-contact.footer-contact': ApiFooterContactFooterContact;
      'api::footer-contact-we-are.footer-contact-we-are': ApiFooterContactWeAreFooterContactWeAre;
      'api::footer-page.footer-page': ApiFooterPageFooterPage;
      'api::footer-term-and-condition.footer-term-and-condition': ApiFooterTermAndConditionFooterTermAndCondition;
      'api::image.image': ApiImageImage;
      'api::learn-more-card.learn-more-card': ApiLearnMoreCardLearnMoreCard;
      'api::learn-more-card-array.learn-more-card-array': ApiLearnMoreCardArrayLearnMoreCardArray;
      'api::moosway.moosway': ApiMooswayMoosway;
      'api::navbar.navbar': ApiNavbarNavbar;
      'api::navbar-right-side.navbar-right-side': ApiNavbarRightSideNavbarRightSide;
      'api::navbar-sub-topic.navbar-sub-topic': ApiNavbarSubTopicNavbarSubTopic;
      'api::oldway.oldway': ApiOldwayOldway;
      'api::our-company-page-job-vacancy.our-company-page-job-vacancy': ApiOurCompanyPageJobVacancyOurCompanyPageJobVacancy;
      'api::our-company-page-job-vacancy-qualification.our-company-page-job-vacancy-qualification': ApiOurCompanyPageJobVacancyQualificationOurCompanyPageJobVacancyQualification;
      'api::our-company-page-meet-our-team.our-company-page-meet-our-team': ApiOurCompanyPageMeetOurTeamOurCompanyPageMeetOurTeam;
      'api::our-company-page-title-card.our-company-page-title-card': ApiOurCompanyPageTitleCardOurCompanyPageTitleCard;
      'api::our-company-page-title-point.our-company-page-title-point': ApiOurCompanyPageTitlePointOurCompanyPageTitlePoint;
      'api::page.page': ApiPagePage;
      'api::partner.partner': ApiPartnerPartner;
      'api::quote.quote': ApiQuoteQuote;
      'api::service.service': ApiServiceService;
      'api::service-card-body.service-card-body': ApiServiceCardBodyServiceCardBody;
      'api::technology-page.technology-page': ApiTechnologyPageTechnologyPage;
      'api::technology-page-process-card.technology-page-process-card': ApiTechnologyPageProcessCardTechnologyPageProcessCard;
      'api::title.title': ApiTitleTitle;
    }
  }
}
