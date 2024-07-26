const { body } = require('express-validator');
const {
	routesConfig: {
		examination: {
			pages: { personalInformationWhichCommentFiles, personalInformationWhichFiles }
		}
	}
} = require('../../../../routes/config');

const validatePersonalInformationWhichCommentFiles = () => {
	return [
		body(personalInformationWhichCommentFiles.id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) =>
				i18n.t('examination.personalInformationWhich.commentFiles.errorMessage1')
			)
	];
};

const validatePersonalInformationWhichFiles = () => {
	return [
		body(personalInformationWhichFiles.id)
			.notEmpty()
			.withMessage((_, { req: { i18n } }) =>
				i18n.t('examination.personalInformationWhich.files.errorMessage1')
			)
	];
};

module.exports = {
	validatePersonalInformationWhichCommentFiles,
	validatePersonalInformationWhichFiles
};
