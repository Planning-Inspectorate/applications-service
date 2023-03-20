const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { editQuery } = require('../../../../../controllers/utils/queryMode');
const {
	routesConfig: {
		examination: {
			pages: { evidenceOrComment }
		}
	}
} = require('../../../../../routes/config');

const getSummaryListItemEvidenceOrComment = (submissionItem) => {
	let evidenceOrCommentValueText;

	const evidenceOrCommentSessionValue = submissionItem.submissionType;

	switch (evidenceOrCommentSessionValue) {
		case evidenceOrComment.options[1].value:
			evidenceOrCommentValueText = evidenceOrComment.options[1].text;
			break;
		case evidenceOrComment.options[2].value:
			evidenceOrCommentValueText = evidenceOrComment.options[2].text;
			break;
		case evidenceOrComment.options[3].value:
			evidenceOrCommentValueText = evidenceOrComment.options[3].text;
			break;
		default:
			throw new Error('Submission item submission type value is not a required option');
	}

	return getSummaryListItem(
		`How you've submitted your representation`,
		evidenceOrCommentValueText,
		`${evidenceOrComment.route}${editQuery}`
	);
};

module.exports = { getSummaryListItemEvidenceOrComment };
