const { featureHideLink } = require('../../../../config');
const featureToggles = () => {
	const {
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		hideRecommendationAndDecisionLink,
		hideExaminationTimetableLink
	} = featureHideLink;

	return {
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		hideRecommendationAndDecisionLink,
		hideExaminationTimetableLink
	};
};

module.exports = {
	featureToggles
};
