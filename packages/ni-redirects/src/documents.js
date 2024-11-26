const documentPrefix = '/wp-content/ipc/uploads/projects/';

// document paths are in the form /wp-content/ipc/uploads/projects/{caseRef}/{docRef}-{fileName}
const documentRegex = new RegExp(
	/^\/wp-content\/ipc\/uploads\/projects\/(?<caseRef>[A-Za-z0-9]*)\/([A-Za-z0-9]*)-(?<docRef>[A-Za-z0-9]*)-(?<fileName>.*)$/
);

/**
 * Determine if the given path looks like a document link
 *
 * @param {string} path
 * @returns {boolean}
 */
export function isDocumentLink(path) {
	return path.startsWith(documentPrefix);
}

/**
 * Determine the URL to redirect to for the given document path.
 * Returns null if the document cannot be redirected.
 *
 * @param {string} path
 * @param {import('./index').EnvConfig} env
 * @param {string[]} redirectAllowedCaseReferences
 * @returns {string|null}
 */
export function getDocumentRedirect(path, env, redirectAllowedCaseReferences) {
	const match = documentRegex.exec(path);

	if (!match) {
		return null;
	}

	const { caseRef, docRef, fileName } = match.groups;

	if (!caseRef || !docRef || !fileName) {
		return null;
	}

	if (!redirectAllowedCaseReferences.includes(caseRef)) {
		return null; // not enabled for this case
	}
	const blobBase = env.blobStoreUrl;

	const parts = [caseRef, docRef, fileName];

	return `${blobBase}/${parts.join('-')}`;
}
