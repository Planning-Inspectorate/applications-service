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

const getPersonalInformationValueText = (submissionItem) => {
	let personalInformationValueText;

	const personalInformationSessionValue = submissionItem[personalInformation.sessionId];

	switch (personalInformationSessionValue) {
		case personalInformation.options[1].value:
			personalInformationValueText = personalInformation.options[1].text;
			break;
		case personalInformation.options[2].value:
			personalInformationValueText = personalInformation.options[2].text;
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

const getSummaryListItemPersonalInformation = (submissionItem) => {
	const personalInformationValueText = getPersonalInformationValueText(submissionItem);
	const changeUrl = getChangeUrl(submissionItem);
	return getSummaryListItem(personalInformation.name, personalInformationValueText, `${changeUrl}`);
};

module.exports = { getSummaryListItemPersonalInformation };
