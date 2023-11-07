'use strict';

/**
 * oldway service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::oldway.oldway');
