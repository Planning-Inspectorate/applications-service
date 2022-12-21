const { featureHideLink } = require('../../../../config');
const featureToggles = () => {
	const {
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		hideRecommendationAndDecisionLink
	} = featureHideLink;

	return {
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink,
		hideRecommendationAndDecisionLink
	};
};

module.exports = {
	featureToggles
};
