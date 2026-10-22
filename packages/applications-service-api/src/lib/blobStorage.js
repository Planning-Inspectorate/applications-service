const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require('@azure/storage-blob');

const config = require('./config');
const logger = require('./logger');

class BlobStorage {
	static instance = null;
	client = null;

	constructor() {
		if (BlobStorage.instance) {
			return BlobStorage.instance;
		}
	}

	static getInstance() {
		if (!BlobStorage.instance) {
			BlobStorage.instance = new BlobStorage();
		}
		return BlobStorage.instance;
	}

	getClient() {
		if (!this.client) {
			throw new Error('Blob storage not initialised');
		}
		return this.client;
	}

	async initBlobStorageClient() {
		if (this.client) return this.getClient();
		try {
			this.client = new BlobServiceClient(
				config.backOfficeIntegration.blobStorage.deadlineSubmissions.url,
				new DefaultAzureCredential()
			);
			return this.getClient();
		} catch (e) {
			logger.error('Error creating BlobServiceClient');
			throw e;
		}
	}

	async upload(buffer, mimeType, path) {
		try {
			await this.getClient()
				.getContainerClient(config.backOfficeIntegration.blobStorage.deadlineSubmissions.container)
				.getBlockBlobClient(path)
				.uploadData(buffer, { blobHTTPHeaders: { blobContentType: mimeType } });
		} catch (e) {
			logger.error('Error uploading file to Blob Storage');
			throw e;
		}
	}
}

module.exports = { BlobStorage };
