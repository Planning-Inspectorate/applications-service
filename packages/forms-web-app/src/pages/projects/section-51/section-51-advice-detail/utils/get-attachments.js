const fileTypeDisplayHelper = require('../../../../../lib/file-type-display-helper');

const getAttachments = (attachments) =>
	attachments.map((attachment) => ({
		text: `View advice (${fileTypeDisplayHelper(attachment.mime)})`,
		url: attachment.documentURI
	}));

module.exports = { getAttachments };
