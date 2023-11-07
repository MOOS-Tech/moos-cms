'use strict';

/**
 * moosway service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::moosway.moosway');
