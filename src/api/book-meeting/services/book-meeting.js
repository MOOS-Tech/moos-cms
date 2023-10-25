'use strict';

/**
 * book-meeting service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::book-meeting.book-meeting');
