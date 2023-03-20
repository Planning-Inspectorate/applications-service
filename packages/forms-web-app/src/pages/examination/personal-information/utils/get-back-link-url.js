const {
	routesConfig: {
		examination: {
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

	if (currentViewId === personalInformationComment.id) backLinkUrl = `${enterComment.route}`;
	else if (currentViewId === personalInformationCommentFiles.id)
		backLinkUrl = `${selectFile.route}`;
	else if (currentViewId === personalInformationFiles.id) backLinkUrl = `${selectFile.route}`;

	if (!backLinkUrl) throw new Error('Current view ID does not match any personal information IDs');

	return backLinkUrl;
};

module.exports = { getBackLinkUrl };
