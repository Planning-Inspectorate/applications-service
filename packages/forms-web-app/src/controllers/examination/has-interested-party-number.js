const { isQueryModeEdit } = require('../utils/is-query-mode-edit');
const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;
const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				applicant: { route: applicantRoute },
				checkYourAnswers: { route: checkYourAnswersRoute },
				hasInterestedPartyNumber,
				haveYourSay: { route: examinationHaveYourSayRoute },
				yourInterestedPartyNumber: { route: yourInterestedPartyNumberRoute }
			}
		}
	}
} = require('../../routes/config');

const {
	options: { 1: yesOption, 2: noOption }
} = hasInterestedPartyNumber;

const pageData = {
	backLinkUrl: `${examinationDirectory}${examinationHaveYourSayRoute}`,
	hintHtml:
		'This is a unique reference number that identifies you as an interested party.<br />You will have been given this number when you registered.',
	id: hasInterestedPartyNumber.id,
	options: [hasInterestedPartyNumber.options[1], hasInterestedPartyNumber.options[2]],
	pageTitle: hasInterestedPartyNumber.name,
	title: hasInterestedPartyNumber.name
};

const getHasInterestedPartyNumber = (req, res) => {
	const setPageData = { ...pageData };

	const examinationSessionInterestedPartyNumber =
		req?.session?.[examinationSessionStorage.name]?.[
			examinationSessionStorage.property.hasInterestedPartyNumber
		];

	if (examinationSessionInterestedPartyNumber) {
		const interestedPartyNumberValues = { ...hasInterestedPartyNumber.options };

		const updatedInterestedPartyNumberValues = Object.keys(interestedPartyNumberValues).map(
			(value) => {
				const valueChecked =
					interestedPartyNumberValues[value].value === examinationSessionInterestedPartyNumber;

				if (!valueChecked) return interestedPartyNumberValues[value];

				return {
					...interestedPartyNumberValues[value],
					checked: 'checked'
				};
			}
		);

		setPageData.options = updatedInterestedPartyNumberValues;
	}

	res.render(hasInterestedPartyNumber.view, setPageData);
};

const postHasInterestedPartyNumber = (req, res) => {
	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[hasInterestedPartyNumber.id] || Object.keys(errors).length > 0) {
		res.render(hasInterestedPartyNumber.view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const hasInterestedPartyNoValue = body?.[hasInterestedPartyNumber.id];

	if (!hasInterestedPartyNoValue) return res.status(404).render('error/not-found');

	const hasValidValue = Object.keys(hasInterestedPartyNumber.options).find(
		(hasInterestedPartyNumberOption) => {
			return (
				hasInterestedPartyNumber.options[hasInterestedPartyNumberOption].value ===
				hasInterestedPartyNoValue
			);
		}
	);

	if (!hasValidValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.hasInterestedPartyNumber] =
		hasInterestedPartyNoValue;

	if (hasInterestedPartyNoValue === hasInterestedPartyNumber.options[1].value) {
		examinationSession[examinationSessionStorage.property.applicant] = '';
	}

	if (hasInterestedPartyNoValue === hasInterestedPartyNumber.options[2].value) {
		examinationSession[examinationSessionStorage.property.interestedPartyNumber] = '';
	}

	if (isQueryModeEdit(query)) res.redirect(`${examinationDirectory}${checkYourAnswersRoute}`);
	else if (yesOption.value === hasInterestedPartyNoValue)
		res.redirect(`${examinationDirectory}${yourInterestedPartyNumberRoute}`);
	else if (noOption.value === hasInterestedPartyNoValue)
		res.redirect(`${examinationDirectory}${applicantRoute}`);
	else res.status(500).render('error/unhandled-exception');
};

module.exports = {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
};
