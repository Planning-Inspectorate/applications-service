const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { getSubmissionItemFiles } = require('../../../_session/submission-items-session');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
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

const getSummaryListItemSelectFile = (i18n, submissionItem) => {
	const submissionItemFiles = getSubmissionItemFiles(submissionItem);

	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkSubmissionItem.summaryListHeading3'),
		formatSubmissionItemFiles(submissionItemFiles),
		`${selectFile.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemSelectFile };
