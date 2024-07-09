const { isQueryModeEdit } = require('../../../controllers/utils/is-query-mode-edit');
const config = require('../../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;
const {
	routesConfig: {
		examination: {
			pages: {
				applicant: { route: applicantRoute },
				checkYourAnswers: { route: checkYourAnswersRoute },
				hasInterestedPartyNumber,
				yourInterestedPartyNumber: { route: yourInterestedPartyNumberRoute }
			}
		}
	}
} = require('../../../routes/config');
const {
	getHasInterestedPartyNumberOptions
} = require('./utils/get-has-interested-party-number-options');
const { getPageData } = require('./utils/get-page-data');

const view = 'examination/has-interested-party-number/view.njk';

const getHasInterestedPartyNumber = (req, res) => {
	const { i18n } = req;

	const hasInterestedPartyNumberOptions = getHasInterestedPartyNumberOptions(i18n);

	const pageData = getPageData(hasInterestedPartyNumberOptions);

	const setPageData = { ...pageData };

	const examinationSessionInterestedPartyNumber =
		req?.session?.[examinationSessionStorage.name]?.[
			examinationSessionStorage.property.hasInterestedPartyNo
		];

	if (examinationSessionInterestedPartyNumber) {
		const interestedPartyNumberValues = { ...hasInterestedPartyNumberOptions };

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

	res.render(view, setPageData);
};

const postHasInterestedPartyNumber = (req, res) => {
	const { i18n } = req;

	const hasInterestedPartyNumberOptions = getHasInterestedPartyNumberOptions(i18n);

	const pageData = getPageData(hasInterestedPartyNumberOptions);

	const { 1: yesOption, 2: noOption } = hasInterestedPartyNumberOptions;

	const { session = {} } = req;

	const examinationSession = session?.[examinationSessionStorage.name];

	if (!examinationSession) return res.status(404).render('error/not-found');

	const { body = {}, query } = req;
	const { errors = {}, errorSummary = [] } = body;

	if (errors[hasInterestedPartyNumber.id] || Object.keys(errors).length > 0) {
		res.render(view, {
			...pageData,
			errors,
			errorSummary
		});

		return;
	}

	const hasInterestedPartyNoValue = body?.[hasInterestedPartyNumber.id];

	if (!hasInterestedPartyNoValue) return res.status(404).render('error/not-found');

	const hasValidValue = Object.keys(hasInterestedPartyNumberOptions).find(
		(hasInterestedPartyNumberOption) => {
			return (
				hasInterestedPartyNumberOptions[hasInterestedPartyNumberOption].value ===
				hasInterestedPartyNoValue
			);
		}
	);

	if (!hasValidValue) return res.status(404).render('error/not-found');

	examinationSession[examinationSessionStorage.property.hasInterestedPartyNo] =
		hasInterestedPartyNoValue;

	if (hasInterestedPartyNoValue === yesOption.value) {
		examinationSession[examinationSessionStorage.property.applicant] = '';
	}

	if (hasInterestedPartyNoValue === noOption.value) {
		examinationSession[examinationSessionStorage.property.interestedPartyNumber] = '';
	}

	if (isQueryModeEdit(query)) res.redirect(`${checkYourAnswersRoute}`);
	else if (yesOption.value === hasInterestedPartyNoValue)
		res.redirect(`${yourInterestedPartyNumberRoute}`);
	else if (noOption.value === hasInterestedPartyNoValue) res.redirect(`${applicantRoute}`);
	else res.status(500).render('error/unhandled-exception');
};

module.exports = {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
};
