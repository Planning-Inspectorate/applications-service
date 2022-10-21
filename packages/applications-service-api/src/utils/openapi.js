const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const logger = require('../lib/logger');
const config = require('../lib/config');
const { memoizeWith } = require("ramda");
const OpenAPIRequestValidator = require("openapi-request-validator").default;

// eslint-disable-next-line no-unused-vars
const loadOpenAPISpec = memoizeWith(Object, _ => {
    let spec;
    try {
        const fileContents = fs.readFileSync(path.join(config.docs.api.path, 'openapi.yaml'), 'utf8');
        spec = yaml.safeLoad(fileContents);
        logger.debug(`Loaded api spec doc`);
    } catch (err) {
        logger.error(`problem loading api spec doc\n${err}`);
    }
    return spec;
});

const createRequestValidator = (verb, path) => {
    try {
        const openAPISpec = loadOpenAPISpec();
        const requestSpec = openAPISpec.paths[path][verb.toLowerCase()];

        return new OpenAPIRequestValidator({
            ...requestSpec,
            schemas: openAPISpec.components.schemas
        });
    } catch (error) {
        logger.error(`OpenAPI spec for ${verb} ${path} not found`, error);
        throw error;
    }
}

module.exports = {
    loadOpenAPISpec,
    createRequestValidator
}