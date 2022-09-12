const config = require('../../config');
const examinationSessionStorage = config?.sessionStorage?.examination;

const {
	routesConfig: {
		examination: {
			directory: examinationDirectory,
			pages: {
				checkYourAnswers: { route: checkYourAnswersRoute },
				hasInterestedPartyNumber,
				haveYourSay: { route: examinationHaveYourSayRoute }
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
			examinationSessionStorage.property.hasInterestedPartyNo
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
	try {
		const { body = {}, session = {} } = req;
		const { errors = {}, errorSummary = [] } = body;

		if (errors[hasInterestedPartyNumber.id] || Object.keys(errors).length > 0) {
			res.render(hasInterestedPartyNumber.view, {
				...pageData,
				errors,
				errorSummary
			});

			return;
		}

		const hasInterestedPartyNo = body?.[hasInterestedPartyNumber.id];

		if (!hasInterestedPartyNo) return res.status(404).render('error/not-found');

		const examinationSession = session?.[examinationSessionStorage.name] || {};

		const previousSessionValue =
			examinationSession[examinationSessionStorage.property.hasInterestedPartyNo];

		examinationSession[examinationSessionStorage.property.hasInterestedPartyNo] =
			hasInterestedPartyNo;

		if (req?.query?.mode === 'edit' && previousSessionValue === hasInterestedPartyNo)
			res.redirect(`${examinationDirectory}${checkYourAnswersRoute}`);
		else if (yesOption.value === hasInterestedPartyNo)
			res.redirect(`${examinationDirectory}${yesOption.nextPage}`);
		else if (noOption.value === hasInterestedPartyNo)
			res.redirect(`${examinationDirectory}${noOption.nextPage}`);
		else res.status(500).render('error/unhandled-exception');
	} catch {
		res.status(500).render('error/unhandled-exception');
	}
};

module.exports = {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
};
