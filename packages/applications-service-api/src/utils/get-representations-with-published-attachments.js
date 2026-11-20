const {
	getPublishedDocumentIds: getPublishedDocumentIdsBORepository
} = require('../repositories/document.backoffice.repository');
const {
	getPublishedDocumentIds: getPublishedDocumentIdsNIRepository
} = require('../repositories/document.ni.repository');

const getRepresentationsWithPublishedAttachments = async (representations, isBOApplication) => {
	const allAttachmentIds = representations.map((representation) => {
		return representation?.Attachments?.split(',') || [];
	});

	const filteredAttachmentIds = allAttachmentIds.filter(
		(attachmentIds) => attachmentIds.length > 0
	);

	let allPublishedAttachmentIds;

	if (!filteredAttachmentIds || !filteredAttachmentIds.length) {
		allPublishedAttachmentIds = [];
	} else {
		allPublishedAttachmentIds = isBOApplication
			? await getPublishedDocumentIdsBORepository(filteredAttachmentIds.flat())
			: await getPublishedDocumentIdsNIRepository(filteredAttachmentIds.flat());
	}

	const allPublishedAttachmentIdsSet = new Set(allPublishedAttachmentIds);

	return representations.map((representation) => {
		const attachmentIds = representation?.Attachments?.split(',') || [];

		const noAttachmentIds = !attachmentIds || !attachmentIds.length;
		const noPublishedAttachmentIds =
			!allPublishedAttachmentIdsSet || !allPublishedAttachmentIdsSet.size;

		let hasPublishedAttachments;

		if (noAttachmentIds || noPublishedAttachmentIds) {
			hasPublishedAttachments = false;
		} else {
			hasPublishedAttachments = attachmentIds.some((attachmentId) =>
				allPublishedAttachmentIdsSet.has(attachmentId)
			);
		}

		return {
			...representation,
			hasPublishedAttachments
		};
	});
};

module.exports = {
	getRepresentationsWithPublishedAttachments
};
