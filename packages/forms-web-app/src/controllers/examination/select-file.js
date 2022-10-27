const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				evidenceOrComment: { route: evidenceOrCommentRoute },
				selectFile
			}
		}
	}
} = require('../../routes/config');

const {
	fileUpload: { maxFileSizeInMb }
} = require('../../config');

const { getUploadedFilesFromSession } = require('./file-upload/fileSessionManagement');
const { noFileSelected } = require('./file-upload/fileValidation');
const { deleteHandler, uploadHandler } = require('./file-upload/handlers');
const {
	mapUploadedFilesToSummaryList,
	addHrefToErrorSummary,
	mapErrorMessage
} = require('./file-upload/utils');
const { getSelectedDeadlineItem } = require('./utils/sessionHelpers');

const setData = {
	backLinkUrl: `${examinationDirectory}${evidenceOrCommentRoute}`,
	id: selectFile.id,
	pageTitle: selectFile.name,
	title: selectFile.name,
	captionTitle: 'Deadline item:',
	maxFileSizeInMb
};

const renderView = (req, res, session, { errorMessage, errorSummary }) => {
	const isJsEnabled = req.body.isJsEnabled || false;
	const href = isJsEnabled ? '#file-upload' : `#${selectFile.id}`;

	return res.render(selectFile.view, {
		...setData,
		isJsEnabled,
		selectedDeadlineItemTitle: getSelectedDeadlineItem(session),
		errorMessage,
		errorSummary: addHrefToErrorSummary(errorSummary, href),
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(session))
	});
};

const continueHandler = (req, res) => {
	const { session } = req;
	const uploadedFiles = getUploadedFilesFromSession(req.session);

	const noFileError = noFileSelected(uploadedFiles);
	if (noFileError) return renderView(req, res, session, mapErrorMessage(noFileError));

	res.redirect('/examination/files-have-personal-information-or-not');
};

const getSelectFile = (req, res) =>
	res.render(selectFile.view, {
		...setData,
		selectedDeadlineItemTitle: getSelectedDeadlineItem(req.session),
		uploadedFiles: mapUploadedFilesToSummaryList(getUploadedFilesFromSession(req.session))
	});

const postSelectFile = async (req, res) => {
	try {
		const { body, session, files } = req;
		if ('delete' in body) {
			await deleteHandler(session, body.delete);
			return res.redirect(`/examination${selectFile.route}`);
		}

		if ('continue' in body) return continueHandler(req, res);

		if ('upload' in body) {
			const errors = await uploadHandler(session, files);
			return renderView(req, res, session, errors);
		}
	} catch (err) {
		console.log('Error: ', err);
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getSelectFile,
	postSelectFile
};
