'use strict';

const boom = require('boom');
const joi = require('joi');

function cookbookUrl (req, reply) {
    req.model('SystemFeature').findById('cookbook')
        .then(feature => feature ? `${feature.data.host}?lookup=${req.params.id}&matchType=exact_text` : boom.notFound())
        .nodeify(reply);
}

exports.get = {
    pre: [
        { assign: 'uri', method: cookbookUrl }
    ],
    handler: function(req, reply) {
        reply.redirect(req.pre.uri);
    },
    validate: {
        params: {
            type: joi.string(),
            id: joi.string()
        }
    },
    plugins: {
        hal: {
            api: 'dcb:document'
        }
    }
};