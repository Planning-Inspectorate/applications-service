const config = require('../lib/config');

/**
 * Returns the URL for the blob store documents.
 * This is used to access documents stored in Azure Blob Storage.
 *
 * @returns {string} The URL for the blob store documents.
 * @throws {Error} If the AZURE_BLOB_STORE_HOST environment variable is not set.
 */
const getUrlForBlobStoreDocs = () => {
	// The base url for the blob store documents in prod
	if (!config.backOfficeIntegration.blobStorage.docsURL) {
		throw new Error('AZURE_BLOB_STORE_HOST environment variable is not set');
	}
	return config.backOfficeIntegration.blobStorage.docsURL.trim();
};

module.exports = getUrlForBlobStoreDocs;
