const { headerTitles } = require('../config');

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

	if (getUpdatesRegex.test(path)) {
		return headerTitles.getUpdatesAboutProject;
	}

	if (registerToHaveYourSayRegex.test(path)) {
		return headerTitles.registerToHaveYourSay;
	}

	if (examinationHaveYourSayRegex.test(path)) {
		return headerTitles.examinationHaveYourSay;
	}
};

module.exports = {
	getHeaderTitleFromPath
};
