//regex to match two letters followed by some numbers [caseId] followed by a '/examination' and not followed by /have-your-say-during-examination
const examinationHaveYourSayRegex = new RegExp(
	/[a-zA-Z]{2}\d+\/examination\/(?!have-your-say-during-examination)/
);

//regex to test the paths and ensure it has two letters followed by some numbers [caseId] followed by a '/get-updates' and not followed by '/start'
const getUpdatesRegex = new RegExp(/[a-zA-Z]{2}\d+\/get-updates\/(?!start)/);

//regex to match two letters followed by some numbers [caseId] followed by a '/register' and not followed by /register-have-your-say
const registerToHaveYourSayRegex = new RegExp(
	/[a-zA-Z]{2}\d+\/register\/(?!register-have-your-say)/
);

const getHeaderTitle = (path, i18n) => {
	switch (true) {
		case examinationHaveYourSayRegex.test(path):
			return i18n.t('global.headerTitle.examination');
		case getUpdatesRegex.test(path):
			return i18n.t('global.headerTitle.getUpdates');
		case registerToHaveYourSayRegex.test(path):
			return i18n.t('global.headerTitle.register');
		default:
			return i18n.t('global.headerTitle.default');
	}
};

module.exports = {
	getHeaderTitle
};
