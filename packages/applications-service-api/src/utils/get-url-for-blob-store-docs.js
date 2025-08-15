const getUrlForBlobStoreDocs = () => {
	// The base url for the blob store documents in prod
	if (!process.env.AZURE_BLOB_STORE_HOST) {
		throw new Error('AZURE_BLOB_STORE_HOST environment variable is not set');
	}
	return process.env.AZURE_BLOB_STORE_HOST.trim();
};

module.exports = getUrlForBlobStoreDocs;
