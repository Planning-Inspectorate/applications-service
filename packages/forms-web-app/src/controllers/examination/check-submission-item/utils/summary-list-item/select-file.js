const { getSummaryListItemWithLink } = require('../../../../utils/get-summary-list-item-with-link');
const { getSubmissionItemFiles } = require('../../../session/submission-items-session');
const { editQuery } = require('./config');
const {
	routesConfig: {
		examination: {
			directory,
			pages: { selectFile }
		}
	}
} = require('../../../../../routes/config');

const formatSubmissionItemFiles = (submissionItemFiles) => {
	const valuesAsList = submissionItemFiles.reduce(
		(formattedSubmissionItemFiles, submissionItemFile) =>
			`${formattedSubmissionItemFiles}<li>${submissionItemFile.fileName}</li>`,
		''
	);

	return `<ul class="govuk-list">${valuesAsList}</ul>`;
};

const getSummaryListItemSelectFile = (submissionItem) => {
	const submissionItemFiles = getSubmissionItemFiles(submissionItem);

	return getSummaryListItemWithLink(
		'Documents uploaded',
		formatSubmissionItemFiles(submissionItemFiles),
		`${directory}${selectFile.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSelectFile };
