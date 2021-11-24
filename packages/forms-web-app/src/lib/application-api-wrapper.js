const fetch = require('node-fetch');
const uuid = require('uuid');
const { utils } = require('@pins/common');

const config = require('../config');
const parentLogger = require('./logger');
const { logger } = require('../config');

async function handler(path, method = 'GET', opts = {}, headers = {}) {
  const correlationId = uuid.v4();
  const url = `${config.applications.url}${path}`;

  const logger = parentLogger.child({
    correlationId,
    service: 'Application Service API',
  });

  try {
    logger.debug({ url, method, opts, headers }, 'New call');
    return await utils.promiseTimeout(
      config.applications.timeout,
      Promise.resolve().then(async () => {
        const apiResponse = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
            'X-Correlation-ID': correlationId,
            ...headers,
          },
          ...opts,
        });
        if (!apiResponse.ok) {
          logger.debug(apiResponse, 'API Response not OK');
          if(apiResponse.status === 404){
            const respData = {resp_code: 404 };
            return respData;
          }
          try {
            const errorResponse = await apiResponse.json();
            /* istanbul ignore else */
            if (errorResponse.errors && errorResponse.errors.length) {
              throw new Error(errorResponse.errors.join('\n'));
            }

            /* istanbul ignore next */
            throw new Error(apiResponse.statusText);
          } catch (e) {
            throw new Error(e.message);
          }
        }

        logger.debug('Successfully called');

        const data = await apiResponse.json();
        const wrappedResp = {...data, resp_code: apiResponse.status}
        logger.debug('Successfully parsed to JSON');

        return data;
      })
    );
  } catch (err) {
    logger.error({ err }, 'Error');
    throw err;
  }
}

exports.getProjectData = async (case_ref) => {
  return handler(`/api/v1/applications/${case_ref}`);
};

exports.getAllProjectList = async () => {
  return handler('/api/v1/applications');
};

exports.searchDocumentList = async (case_ref, search_data) => {
  const documentServiceApiUrl = `/api/v1/documents/${case_ref}`;
  const method = 'POST';
  return handler(documentServiceApiUrl, method, {
    body: search_data,
  });
};

exports.postSelfRegistration = async (registeration_data) => {
  const registrationServiceApiUrl = '/api/v1/interested-party';
  const method = 'POST';
  return handler(registrationServiceApiUrl, method, {
    body: registeration_data,
  });
};