const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			sessionId: examinationSessionId,
			pages: {
				checkDeadlineItem: { route: checkDeadlineItemRoute },
				enterComment,
				personalInformation,
				personalInformationComment,
				personalInformationCommentFiles,
				personalInformationFiles,
				personalInformationWhichCommentFiles: { route: personalInformationWhichCommentFilesRoute },
				personalInformationWhichFiles: { route: personalInformationWhichFilesRoute },
				selectDeadline,
				selectFile
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	hintHtml:
		"<span>Check if your files contain information about:</span><ul><li>children</li><li>health</li><li>crime</li></ul><span>This also includes any information relating to an individual's:</span><ul><li>race</li><li>ethnic origin</li><li>politics</li><li>religion</li><li>trade union membership</li><li>genetics</li><li>biometrics</li><li>sex life</li><li>sexual orientation</li></ul>"
};

const getSelectedDeadlineItem = (req) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionId];

	if (!examinationSession) return false;

	const selectedDeadlineItems = examinationSession?.[selectDeadline.sessionIdPrimary];
	const selectedDeadlineItemsActiveId = selectedDeadlineItems?.[selectDeadline.sessionIdSecondary];
	const selectedDeadlineItem =
		selectedDeadlineItems?.[selectDeadline.sessionIdTertiary]?.[selectedDeadlineItemsActiveId];

	if (!selectedDeadlineItem) return false;

	return selectedDeadlineItem;
};

const addPageData = (backLinkUrl, currentView) => {
	pageData.backLinkUrl = backLinkUrl;
	pageData.id = currentView.id;
	pageData.pageTitle = currentView.pageTitle;
	pageData.title = currentView.title;
};

const setPageData = (req, selectedDeadlineItem) => {
	const { session } = req;
	const sessionCurrentView = session?.currentView;

	if (!sessionCurrentView) return false;

	switch (sessionCurrentView.id) {
		case personalInformationComment.id:
			addPageData(`${examinationDirectory}${enterComment.route}`, personalInformationComment);

			break;
		case personalInformationCommentFiles.id:
			addPageData(`${examinationDirectory}${selectFile.route}`, personalInformationCommentFiles);

			break;
		case personalInformationFiles.id:
			addPageData(`${examinationDirectory}${selectFile.route}`, personalInformationFiles);

			break;
		default:
			return false;
	}

	if (selectedDeadlineItem?.[personalInformation.sessionId]) {
		pageData.options = Object.keys(personalInformation.options).map((personalInformationOption) => {
			const optionChecked =
				personalInformation.options[personalInformationOption].value ===
				selectedDeadlineItem?.[personalInformation.sessionId];

			if (!optionChecked) return personalInformation.options[personalInformationOption];

			return {
				...personalInformation.options[personalInformationOption],
				checked: 'checked'
			};
		});
	} else {
		pageData.options = [personalInformation.options[1], personalInformation.options[2]];
	}

	return true;
};

const getPersonalInformation = (req, res) => {
	const selectedDeadlineItem = getSelectedDeadlineItem(req);

	if (!selectedDeadlineItem) return res.status(500).render('error/unhandled-exception');

	const hasSetPageData = setPageData(req, selectedDeadlineItem);

	if (!hasSetPageData) return res.status(500).render('error/unhandled-exception');

	res.render(personalInformation.view, pageData);
};

const postPersonalInformation = (req, res) => {
	const selectedDeadlineItem = getSelectedDeadlineItem(req);

	if (!selectedDeadlineItem) return res.status(500).render('error/unhandled-exception');

	const hasSetPageData = setPageData(req);

	if (!hasSetPageData) return res.status(500).render('error/unhandled-exception');

	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[personalInformation.id] || Object.keys(errors).length > 0) {
		res.render(personalInformation.view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const personalInformationValue = body?.[pageData.id];

	if (!personalInformationValue) return res.status(500).render('error/unhandled-exception');

	const hasValidValue = Object.keys(personalInformation.options).find(
		(personalInformationOption) => {
			return (
				personalInformation.options[personalInformationOption].value === personalInformationValue
			);
		}
	);

	if (!hasValidValue) return res.status(500).render('error/unhandled-exception');

	const selectedDeadlineItemFiles = selectedDeadlineItem?.[selectFile.sessionId];

	switch (pageData.id) {
		case personalInformationComment.id:
			selectedDeadlineItem[personalInformation.sessionId] = personalInformationValue;

			break;
		case personalInformationCommentFiles.id:
			selectedDeadlineItem[personalInformation.sessionId] = personalInformationValue;

			if (personalInformationValue === personalInformation.options[1].value) {
				res.redirect(`${examinationDirectory}${personalInformationWhichCommentFilesRoute}`);

				return;
			}

			break;
		case personalInformationFiles.id:
			if (
				!selectedDeadlineItemFiles ||
				!Array.isArray(selectedDeadlineItemFiles) ||
				!selectedDeadlineItemFiles.length
			)
				return res.status(500).render('error/unhandled-exception');

			selectedDeadlineItem[personalInformation.sessionId] = personalInformationValue;

			if (personalInformationValue === personalInformation.options[1].value) {
				if (selectedDeadlineItemFiles.length > 1) {
					return res.redirect(`${examinationDirectory}${personalInformationWhichFilesRoute}`);
				}
			}

			break;
		default:
			return res.status(500).render('error/unhandled-exception');
	}

	res.redirect(`${examinationDirectory}${checkDeadlineItemRoute}`);
};

module.exports = {
	getPersonalInformation,
	postPersonalInformation
};
