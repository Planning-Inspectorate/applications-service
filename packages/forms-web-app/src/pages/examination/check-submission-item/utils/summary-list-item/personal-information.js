const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const { evidenceOrCommentValues } = require('../../../evidence-or-comment/config');
const {
	routesConfig: {
		examination: {
			pages: {
				evidenceOrComment,
				personalInformation,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles
			}
		}
	}
} = require('../../../../../routes/config');
const { getPersonalInformationOptions } = require('../../../personal-information/config');

const getPersonalInformationValueText = (i18n, submissionItem) => {
	let personalInformationValueText;

	const personalInformationOptions = getPersonalInformationOptions(i18n);
	const personalInformationSessionValue = submissionItem[personalInformation.sessionId];

	switch (personalInformationSessionValue) {
		case personalInformationOptions[1].value:
			personalInformationValueText = personalInformationOptions[1].text;
			break;
		case personalInformationOptions[2].value:
			personalInformationValueText = personalInformationOptions[2].text;
			break;
		default:
			throw new Error('Submission item personal information value is not a required option');
	}

	return personalInformationValueText;
};

const getChangeUrl = (submissionItem) => {
	let changeUrl;

	const evidenceOrCommentSessionValue = submissionItem[evidenceOrComment.sessionId];

	switch (evidenceOrCommentSessionValue) {
		case evidenceOrCommentValues[1]:
			changeUrl = `${personalInformationComment.route}`;
			break;
		case evidenceOrCommentValues[2]:
			changeUrl = `${personalInformationFiles.route}`;
			break;
		case evidenceOrCommentValues[3]:
			changeUrl = `${personalInformationCommentFiles.route}`;
			break;
		default:
			throw new Error('Submission item submission type value does not match a required option');
	}

	return changeUrl;
};

const getSummaryListItemPersonalInformation = (i18n, submissionItem) => {
	const personalInformationValueText = getPersonalInformationValueText(i18n, submissionItem);
	const changeUrl = getChangeUrl(submissionItem);
	return getSummaryListItem(
		i18n,
		i18n.t('examination.checkSubmissionItem.summaryListHeading5'),
		personalInformationValueText,
		`${changeUrl}`
	);
};

module.exports = { getSummaryListItemPersonalInformation };
