const { getExaminationSubmissionItems } = require('../../session/examination-session');

const getAllCommentsAndFilesLength = (session) =>
	getExaminationSubmissionItems(session).reduce(
		(accumulator, { comment, files }) => accumulator + (comment ? 1 : 0) + (files.length || 0),
		0 // initial value
	);

module.exports = { getAllCommentsAndFilesLength };
