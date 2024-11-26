import { getDocumentRedirect, isDocumentLink } from './documents';
import { getProjectRedirect, isProjectLink } from './projects';
import testConfig from './config.test.json';
import prodConfig from './config.prod.json';
import testGeneratedConfig from './config.generated.test.json';
import prodGeneratedConfig from './config.generated.prod.json';

/**
 * @typedef {Object} EnvConfig
 * @property {string} blobStoreUrl
 * @property {string} frontOfficeUrl
 * @property {Object<string, string>} projectRedirects
 */

/**
 * @typedef {Object} EnvGeneratedConfig
 * @property {string[]} redirectAllowedCaseReferences - An array of allowed case references for redirection.
 */

export default {
	/**
	 *
	 * @param {*} request
	 * @param {{CONFIG: string}} env
	 * @returns {Promise<Response>}
	 */
	async fetch(request, env) {
		const isProd = env.CONFIG === 'prod';

		/** @type {EnvConfig} */
		const config = isProd ? prodConfig : testConfig;
		/** @type {EnvGeneratedConfig} */
		const generatedConfig = isProd ? prodGeneratedConfig : testGeneratedConfig;
		const redirectAllowedCaseReferences = generatedConfig.redirectAllowedCaseReferences;
		// Don't log in prod for performance
		if (!isProd) {
			console.log(`Enabling redirection for the following cases: ${redirectAllowedCaseReferences}`);
		}

		const requestURL = new URL(request.url);
		const path = requestURL.pathname;

		if (isDocumentLink(path)) {
			// redirect documents
			const redirectTo = getDocumentRedirect(path, config, redirectAllowedCaseReferences);

			if (redirectTo) {
				return Response.redirect(redirectTo, 301);
			}
			// else fallthrough - no redirect
		} else if (isProjectLink(path)) {
			// redirect projects
			const redirectTo = getProjectRedirect(path, config, redirectAllowedCaseReferences);

			if (redirectTo) {
				return Response.redirect(redirectTo, 301);
			}
			// else fallthrough - no redirect
		}

		// if no redirect configured, return the original request
		return fetch(request);
	}
};
