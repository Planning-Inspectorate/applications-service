const logger = require('../../../../lib/logger');
const { getAppData } = require('../../../../services/applications.service');
const { getRepresentation } = require('../../../../services/representation.service');
const { mapTitles } = require('../../../_utils/map-titles');
const { getRepresentationsURL } = require('../_utils/get-representations-url');
const { getRepresentationViewModel } = require('../index/_utils/get-representations-view-model');
const {
	featureFlag: { allowProjectInformation }
} = require('../../../../config');
const { isLangWelsh } = require('../../../_utils/is-lang-welsh');

const view = 'projects/representations/representation/view.njk';

const getRepresentationController = async (req, res, next) => {
	try {
		const { params, i18n } = req;
		const { case_ref, id } = params;

		const { data: applicationData } = await getAppData(case_ref);
		const { ProjectName } = applicationData;

		const { data: representation } = await getRepresentation(id, case_ref);

		const pageHeading = `Representation by ${representation.PersonalName}`;

		return res.render(view, {
			...mapTitles(pageHeading, `Relevant Representations | ${pageHeading}`),
			representation: getRepresentationViewModel(representation),
			backToListUrl: getRepresentationsURL(case_ref),
			projectName: ProjectName,
			allowProjectInformation,
			langIsWelsh: isLangWelsh(i18n.language)
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getRepresentationController };
