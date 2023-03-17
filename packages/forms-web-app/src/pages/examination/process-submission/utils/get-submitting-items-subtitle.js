const { getAllCommentsAndFilesLength } = require('./get-all-comments-and-files-length');

const getSubmittingItemsSubtitle = (session) => {
	const examinationSubmissionItemsLength = getAllCommentsAndFilesLength(session);
	const itemText = examinationSubmissionItemsLength === 1 ? 'item' : 'items';
	return `We are processing ${examinationSubmissionItemsLength} ${itemText}`;
};

module.exports = { getSubmittingItemsSubtitle };
