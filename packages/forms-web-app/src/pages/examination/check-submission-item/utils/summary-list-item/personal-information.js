const { getSummaryListItem } = require('../../../../../controllers/utils/get-summary-list-item');
const {
	routesConfig: {
		examination: {
			directory,
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
		case evidenceOrComment.options[1].value:
			changeUrl = `${directory}${personalInformationComment.route}`;
			break;
		case evidenceOrComment.options[2].value:
			changeUrl = `${directory}${personalInformationFiles.route}`;
			break;
		case evidenceOrComment.options[3].value:
			changeUrl = `${directory}${personalInformationCommentFiles.route}`;
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
