const { getAllCommentsAndFilesLength } = require('./get-all-comments-and-files-length');

const getSubmittingItemsSubtitle = (i18n, session) => {
	const examinationSubmissionItemsLength = getAllCommentsAndFilesLength(session);

	return getAllCommentsAndFilesLength(session) === 1
		? i18n.t('examination.processingSubmission.subTitle1', {
				itemCount: examinationSubmissionItemsLength
		  })
		: i18n.t('examination.processingSubmission.subTitle2', {
				itemCount: examinationSubmissionItemsLength
		  });
};

module.exports = { getSubmittingItemsSubtitle };
