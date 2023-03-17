const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				enterComment,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles,
				selectFile
			}
		}
	}
} = require('../../../../routes/config');

const getBackLinkUrl = (currentViewId) => {
	let backLinkUrl = '';

	if (currentViewId === personalInformationComment.id)
		backLinkUrl = `${examinationDirectory}${enterComment.route}`;
	else if (currentViewId === personalInformationCommentFiles.id)
		backLinkUrl = `${examinationDirectory}${selectFile.route}`;
	else if (currentViewId === personalInformationFiles.id)
		backLinkUrl = `${examinationDirectory}${selectFile.route}`;

	if (!backLinkUrl) throw new Error('Current view ID does not match any personal information IDs');

	return backLinkUrl;
};

module.exports = { getBackLinkUrl };
