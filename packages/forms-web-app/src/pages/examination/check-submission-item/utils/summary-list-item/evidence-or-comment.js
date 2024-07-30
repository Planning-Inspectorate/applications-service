const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const {
	getEvidenceOrCommentOptions,
	evidenceOrCommentValues
} = require('../../../evidence-or-comment/config');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemEvidenceOrComment = (i18n, submissionItem) => {
	const evidenceOrCommentOptions = getEvidenceOrCommentOptions(i18n);

	let evidenceOrCommentValueText;

	const evidenceOrCommentSessionValue = submissionItem.submissionType;

	switch (evidenceOrCommentSessionValue) {
		case evidenceOrCommentValues[1]:
			evidenceOrCommentValueText = evidenceOrCommentOptions[1].text;
			break;
		case evidenceOrCommentValues[2]:
			evidenceOrCommentValueText = evidenceOrCommentOptions[2].text;
			break;
		case evidenceOrCommentValues[3]:
			evidenceOrCommentValueText = evidenceOrCommentOptions[3].text;
			break;
		default:
			throw new Error('Submission item submission type value is not a required option');
	}

	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkSubmissionItem.summaryListHeading2'),
		evidenceOrCommentValueText,
		`${evidenceOrComment.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemEvidenceOrComment };
