import { getDocumentRedirect, isDocumentLink } from './documents';
import { getProjectRedirect, isProjectLink } from './projects';
import testConfig from './config.test.json';
import prodConfig from './config.prod.json';

/**
 * @typedef {Object} EnvConfig
 * @property {string} blobStoreUrl
 * @property {string} frontOfficeUrl
 * @property {string[]} documentRedirectCaseReferences
 * @property {Object<string, string>} projectRedirects
 */

export default {
	/**
	 *
	 * @param {*} request
	 * @param {{CONFIG: string}} env
	 * @returns {Promise<Response>}
	 */
	async fetch(request, env) {
		/** @type {EnvConfig} */
		const config = env.CONFIG === 'prod' ? prodConfig : testConfig;
		const requestURL = new URL(request.url);
		const path = requestURL.pathname;

		if (isDocumentLink(path)) {
			// redirect documents
			const redirectTo = getDocumentRedirect(path, config);

			if (redirectTo) {
				return Response.redirect(redirectTo, 301);
			}
			// else fallthrough - no redirect
		} else if (isProjectLink(path)) {
			// redirect projects
			const redirectTo = getProjectRedirect(path, config);

			if (redirectTo) {
				return Response.redirect(redirectTo, 301);
			}
			// else fallthrough - no redirect
		}

		// if no redirect configured, return the original request
		return fetch(request);
	}
};
