/* eslint-disable camelcase */
const fetch = require('node-fetch');
const uuid = require('uuid');
const { queryStringBuilder } = require('../utils/query-string-builder');
const config = require('../config');
const parentLogger = require('./logger');

async function handler(
	callingMethod,
	path,
	method = 'GET',
	opts = {},
	headers = { 'Content-Type': 'application/json' }
) {
	const correlationId = uuid.v4();
	const url = `${config.applications.url}${path}`;

	const logger = parentLogger.child({
		correlationId,
		service: 'Application Service API'
	});

	// set up an abort controller to cancel requests after the configured timeout
	const controller = new AbortController();
	const timeout = setTimeout(() => {
		controller.abort();
	}, config.applications.timeout);

	try {
		logger.debug({ url, method, opts, headers }, 'New call');
		const apiResponse = await fetch(url, {
			method,
			headers: {
				'X-Correlation-ID': correlationId,
				...headers
			},
			...opts,
			// signal for cancelling requests after a timeout
			signal: controller.signal
		});
		// request complete, cancel the timeout timer
		clearTimeout(timeout);

		const notFoundResponseCode = { resp_code: 404 };

		if (!apiResponse) {
			logger.debug('apiResponse is undefined', 'API Response not OK');
			return notFoundResponseCode;
		}

		if (!apiResponse.ok) {
			logger.debug(apiResponse, 'API Response not OK');
			if (apiResponse.status === 404) {
				return notFoundResponseCode;
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

		logger.debug('Successfully called ' + callingMethod);

		if (callingMethod === 'putComments') {
			return apiResponse;
		}

		if (apiResponse.status === 204) {
			return { resp_code: apiResponse.status };
		}
		const data = await apiResponse.json();
		return { data, resp_code: apiResponse.status };
	} catch (err) {
		if (err?.name === 'AbortError') {
			logger.error({ url, method, opts, headers }, 'request timeout');
		} else {
			logger.error({ err }, 'Error');
		}
		clearTimeout(timeout); // clear timeout on error
		throw err;
	}
}

exports.handler = handler;
exports.getProjectData = async (case_ref) => {
	return handler('getProjectData', `/api/v1/applications/${case_ref}`);
};

exports.getAllProjectList = async (queryString = '') =>
	handler('getAllProjectList', `/api/v1/applications${queryString}`);

exports.searchDocumentList = async (case_ref, search_data) => {
	const documentServiceApiUrl = `/api/v1/documents/${case_ref}`;
	const method = 'POST';
	return handler('searchDocumentList', documentServiceApiUrl, method, {
		body: search_data
	});
};

exports.getDocumentByType = async (case_ref, type) => {
	return handler('getDocumentByType', `/api/v3/documents/${case_ref}?type=${type}`);
};

exports.searchRepresentations = async (query = '') =>
	handler('searchRepresentations', `/api/v1/representations${query}`);

exports.searchDocumentListV2 = async (params) => {
	const queryString = queryStringBuilder(params, [
		'caseRef',
		'classification',
		'page',
		'searchTerm',
		'stage',
		'type',
		'category'
	]);
	const documentServiceApiUrl = `/api/v2/documents${queryString}`;
	const method = 'GET';
	return handler('searchDocumentListV2', documentServiceApiUrl, method);
};

exports.postRegistration = async (registeration_data) => {
	const registrationServiceApiUrl = '/api/v1/interested-party';
	const method = 'POST';
	return handler('postRegistration', registrationServiceApiUrl, method, {
		body: registeration_data
	});
};

exports.putComments = async (ipRefNo, comments_data) => {
	const commentsServiceApiUrl = `/api/v1/interested-party/${ipRefNo}/comments`;
	const method = 'PUT';
	return handler('putComments', commentsServiceApiUrl, method, {
		body: comments_data
	});
};

exports.authenticateToken = async (token, email) => {
	const authTokenServiceApiUrl = `/api/v1/interested-party/${token}`;
	const method = 'POST';
	return handler('authenticateToken', authTokenServiceApiUrl, method, {
		body: email
	});
};

exports.getRepresentationById = async (id, caseReference) => {
	return handler(
		'getRepresentationById',
		`/api/v1/representations/${id}?caseReference=${caseReference}`
	);
};

exports.getTimetables = async (caseRef) =>
	handler('getTimetables', `/api/v1/timetables/${caseRef}`);

exports.wrappedPostSubmission = async (caseRef, body) => {
	const URL = `/api/v1/submissions/${caseRef}`;
	const method = 'POST';
	return handler(
		'postSubmission',
		URL,
		method,
		{
			body
		},
		{}
	);
};

exports.wrappedSearchDocumentsV3 = async (body) => {
	const URL = `/api/v3/documents`;
	const method = 'POST';
	return handler('searchDocumentsV3', URL, method, {
		body: JSON.stringify(body)
	});
};

exports.getDocumentUriByDocRef = async (docRef) => {
	return handler('getDocumentUriByDocRef', `/api/v3/documents/short-link/${docRef}`);
};

exports.wrappedPostSubmissionComplete = async (submissionId, body) => {
	const URL = `/api/v1/submissions/${submissionId}/complete`;
	const method = 'POST';
	return handler('postSubmissionComplete', URL, method, { body: JSON.stringify(body) });
};

exports.postGetUpdatesSubscription = async (caseRef, payload) => {
	const URL = `/api/v1/subscriptions/${caseRef}`;
	const method = 'POST';

	return handler('postGetUpdatesSubscription', URL, method, { body: JSON.stringify(payload) });
};

exports.putGetUpdatesSubscription = async (caseReference, subscriptionDetails) => {
	const URL = `/api/v1/subscriptions/${caseReference}`;
	const method = 'PUT';

	return handler('putGetUpdatesSubscription', URL, method, {
		body: JSON.stringify({ subscriptionDetails })
	});
};

exports.deleteGetUpdatesSubscription = async (caseReference, email) => {
	const URL = `/api/v1/subscriptions/${caseReference}?email=${email}`;
	const method = 'DELETE';

	return handler('deleteGetUpdatesSubscription', URL, method, {});
};

exports.getProjectUpdates = async (caseReference) =>
	handler('getProjectUpdates', `/api/v1/project-updates/${caseReference}`);
