const logger = require('../../../../lib/logger');
const { NotFoundError } = require('../../../../lib/errors');
const { getRepresentationById } = require('../../../../lib/application-api-wrapper');
const { getRepresentationViewModel } = require('../index/_utils/get-representations-view-model');
const {
	featureFlag: { allowProjectInformation }
} = require('../../../../config');
const { isLangWelsh } = require('../../../_utils/is-lang-welsh');
const {
	getRegisterOfAdviceBackLinkURL
} = require('../../../register-of-advice/index/_utils/get-register-of-advice-back-link-url');

const view = 'projects/representations/representation/view.njk';

const getRepresentationController = async (req, res, next) => {
	try {
		const { params, i18n } = req;
		const { case_ref, id } = params;
		const { projectName } = res.locals.applicationData;

		const { data: representation, resp_code } = await getRepresentationById(id, case_ref);
		if (resp_code === 404) {
			throw new NotFoundError(`Representation with ID ${id}`);
		}

		const backToListUrl = getRegisterOfAdviceBackLinkURL(i18n.language);

		return res.render(view, {
			representation: getRepresentationViewModel(representation, i18n.language),
			backToListUrl,
			projectName,
			allowProjectInformation,
			langIsWelsh: isLangWelsh(i18n.language)
		});
	} catch (error) {
		logger.error(error);
		next(error);
	}
};

module.exports = { getRepresentationController };
