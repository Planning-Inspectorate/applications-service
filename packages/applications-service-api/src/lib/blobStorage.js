const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');

const config = require('./config');
const logger = require('./logger');

const upload = async (buffer, mimeType, path) => {
	let client;
	try {
		client = new BlobServiceClient(
			config.backOfficeIntegration.blobStorage.deadlineSubmissions.url,
			new DefaultAzureCredential()
		);
	} catch (e) {
		logger.error('Error creating BlobServiceClient');
		throw e;
	}

	try {
		await client
			.getContainerClient(config.backOfficeIntegration.blobStorage.deadlineSubmissions.container)
			.getBlockBlobClient(path)
			.uploadData(buffer, { blobHTTPHeaders: { blobContentType: mimeType } });
	} catch (e) {
		logger.error('Error uploading file to Blob Storage');
		throw e;
	}
};

module.exports = { upload };
