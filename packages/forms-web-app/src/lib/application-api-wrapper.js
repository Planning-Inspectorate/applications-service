const fetch = require('node-fetch');
const uuid = require('uuid');
const { utils } = require('@pins/common');

const config = require('../config');
const parentLogger = require('./logger');

async function handler(callingMethod, path, method = 'GET', opts = {}, headers = {}) {
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
          if (apiResponse.status === 404) {
            const respData = { resp_code: 404 };
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

        logger.debug('Successfully called ', callingMethod);

        if (callingMethod === 'putComments') {
          return apiResponse;
        }
        const data = await apiResponse.json();
        logger.debug('Response received: ' + JSON.stringify(data));
        const wrappedResp = { data, resp_code: apiResponse.status };
        logger.debug('Successfully parsed to JSON');

        return wrappedResp;
      })
    );
  } catch (err) {
    logger.error({ err }, 'Error');
    throw err;
  }
}

exports.getProjectData = async (case_ref) => {
  return handler('getProjectData', `/api/v1/applications/${case_ref}`);
};

exports.getAllProjectList = async () => {
  return handler('getAllProjectList', '/api/v1/applications');
};

exports.searchDocumentList = async (case_ref, search_data) => {
  const documentServiceApiUrl = `/api/v1/documents/${case_ref}`;
  const method = 'POST';
  return handler('searchDocumentList', documentServiceApiUrl, method, {
    body: search_data,
  });
};

exports.postRegistration = async (registeration_data) => {
  const registrationServiceApiUrl = '/api/v1/interested-party';
  const method = 'POST';
  return handler('postRegistration', registrationServiceApiUrl, method, {
    body: registeration_data,
  });
};

exports.putComments = async (ipRefNo, comments_data) => {
  const commentsServiceApiUrl = `/api/v1/interested-party/${ipRefNo}/comments`;
  const method = 'PUT';
  return handler('putComments', commentsServiceApiUrl, method, {
    body: comments_data,
  });
};

exports.authenticateToken = async (token, email) => {
  const authTokenServiceApiUrl = `/api/v1/interested-party/${token}`;
  const method = 'POST';
  return handler('authenticateToken', authTokenServiceApiUrl, method, {
    body: email,
  });
};
