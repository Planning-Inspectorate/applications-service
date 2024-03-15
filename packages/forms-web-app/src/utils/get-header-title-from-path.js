const { examinationHeaderTitle } = require('../pages/examination/config');
const { getUpdatesHeaderTitle } = require('../pages/projects/get-updates/config');
const { registerHeaderTitle } = require('../pages/projects/register/config');

const getHeaderTitleFromPath = (path) => {
	//regex to test the paths and ensure it has two letters followed by some numbers [caseId] followed by a '/get-updates' and not followed by '/start'
	const getUpdatesRegex = new RegExp(/[a-zA-Z]{2}\d+\/get-updates\/(?!start)/);

	//regex to match two letters followed by some numbers [caseId] followed by a '/register' and not followed by /register-have-your-say
	const registerToHaveYourSayRegex = new RegExp(
		/[a-zA-Z]{2}\d+\/register\/(?!register-have-your-say)/
	);

	//regex to match two letters followed by some numbers [caseId] followed by a '/examination' and not followed by /have-your-say-during-examination
	const examinationHaveYourSayRegex = new RegExp(
		/[a-zA-Z]{2}\d+\/examination\/(?!have-your-say-during-examination)/
	);

	switch (true) {
		case getUpdatesRegex.test(path):
			return getUpdatesHeaderTitle;
		case registerToHaveYourSayRegex.test(path):
			return registerHeaderTitle;
		case examinationHaveYourSayRegex.test(path):
			return examinationHeaderTitle;
		default:
			return 'Find a National Infrastructure Project';
	}
};

module.exports = {
	getHeaderTitleFromPath
};
