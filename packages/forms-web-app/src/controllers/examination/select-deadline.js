const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			sessionId: examinationSessionId,
			pages: {
				email: { route: emailRoute },
				evidenceOrComment: { route: evidenceOrCommentRoute },
				selectDeadline
			}
		}
	}
} = require('../../routes/config');

const pageData = {
	backLinkUrl: `${examinationDirectory + emailRoute}`,
	hintText:
		'Select the item you want to submit against. You can submit against another item later.',
	id: selectDeadline.id,
	pageTitle: selectDeadline.name,
	title: selectDeadline.name
};

const setSelectDeadlineOptions = (examinationSession) => {
	const examinationSessionDeadlineItems =
		examinationSession[examinationSessionStorage.property.deadlineItems];

	if (
		(!examinationSessionDeadlineItems || !Array.isArray(examinationSessionDeadlineItems),
		!examinationSessionDeadlineItems.length)
	) {
		return false;
	} else {
		pageData.options = examinationSessionDeadlineItems;

		return true;
	}
};

const getSelectDeadline = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionId];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const hasOptions = setSelectDeadlineOptions(examinationSession);

	if (!hasOptions) return res.status(404).render('error/not-found');

	const setPageData = { ...pageData };

	const activeDeadline =
		examinationSession?.[selectDeadline.sessionIdPrimary]?.[selectDeadline.sessionIdSecondary];

	if (activeDeadline) {
		const selectDeadlineValues = [...pageData.options];

		const updatedSelectDeadlineValues = selectDeadlineValues.map((selectDeadlineValue) => {
			const valueChecked = selectDeadlineValue.value === activeDeadline;

			if (!valueChecked) return selectDeadlineValue;

			return {
				...selectDeadlineValue,
				checked: 'checked'
			};
		});

		setPageData.options = updatedSelectDeadlineValues;
	}

	res.render(selectDeadline.view, setPageData);
};

const postSelectDeadline = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionId];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const hasOptions = setSelectDeadlineOptions(examinationSession);

	if (!hasOptions) return res.status(404).render('error/not-found');

	const { body = {} } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[selectDeadline.id] || Object.keys(errors).length > 0) {
		res.render(selectDeadline.view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const selectedDeadline = body?.[selectDeadline.id];

	if (!selectedDeadline) return res.status(404).render('error/not-found');

	const isValidValue = pageData.options.find((examinationSessionDeadlineItem) => {
		return `${examinationSessionDeadlineItem.value}` === `${selectedDeadline}`;
	});

	if (!isValidValue) return res.status(404).render('error/not-found');

	if (!examinationSession[selectDeadline.sessionIdPrimary]) {
		examinationSession[selectDeadline.sessionIdPrimary] = {};
		examinationSession[selectDeadline.sessionIdPrimary][selectDeadline.sessionIdSecondary] = '';
		examinationSession[selectDeadline.sessionIdPrimary][selectDeadline.sessionIdTertiary] = {};
	}

	examinationSession[selectDeadline.sessionIdPrimary][selectDeadline.sessionIdSecondary] =
		selectedDeadline;

	if (
		!examinationSession[selectDeadline.sessionIdPrimary][selectDeadline.sessionIdTertiary][
			selectedDeadline
		]
	) {
		const selectedDeadlineOption = pageData.options.find((option) => {
			return option.value === selectedDeadline;
		});

		examinationSession[selectDeadline.sessionIdPrimary][selectDeadline.sessionIdTertiary][
			selectedDeadline
		] = {
			complete: false,
			itemId: selectedDeadlineOption.value,
			submissionItem: selectedDeadlineOption.text
		};
	}

	res.redirect(examinationDirectory + evidenceOrCommentRoute);
};

module.exports = {
	getSelectDeadline,
	postSelectDeadline
};
