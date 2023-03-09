const { featureHideLink } = require('../../../../config');
const featureToggles = () => {
	const { hideProjectInformationLink, hideAllExaminationDocumentsLink } = featureHideLink;

	return {
		hideProjectInformationLink,
		hideAllExaminationDocumentsLink
	};
};

module.exports = {
	featureToggles
};
