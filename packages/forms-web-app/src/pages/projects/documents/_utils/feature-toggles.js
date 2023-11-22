const {
	featureHideLink: { hideAllExaminationDocumentsLink },
	featureFlag: { allowProjectInformation }
} = require('../../../../config');
const featureToggles = () => ({
	allowProjectInformation,
	hideAllExaminationDocumentsLink
});

module.exports = {
	featureToggles
};
