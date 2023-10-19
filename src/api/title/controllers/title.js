'use strict';

/**
 * title controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::title.title',({ strapi }) =>  ({
    async findOne(ctx){
        const { id } = ctx.params;

        const entity = await strapi.db.query('api::title.title').findOne({
            where: {BelongTo:id}
        });

        const sanitizedEntry = await this.sanitizeOutput(entity,ctx);
        return this.transformResponse(sanitizedEntry)

    }
}));
