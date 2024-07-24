const fileTypeDisplayHelper = require('../../../../../lib/file-type-display-helper');

const getAttachments = (attachments, i18n) =>
	attachments.map((attachment) => ({
		text: `${i18n.t('section51.details.viewAdvice')} (${fileTypeDisplayHelper(attachment.mime)})`,
		url: attachment.documentURI
	}));

module.exports = { getAttachments };
