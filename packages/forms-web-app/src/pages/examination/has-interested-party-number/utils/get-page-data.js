const {
	routesConfig: {
		examination: {
			pages: {
				hasInterestedPartyNumber,
				haveYourSay: { route: examinationHaveYourSayRoute }
			}
		}
	}
} = require('../../../../routes/config');

const getPageData = (hasInterestedPartyNumberOptions) => {
	return {
		backLinkUrl: `${examinationHaveYourSayRoute}`,
		id: hasInterestedPartyNumber.id,
		options: [hasInterestedPartyNumberOptions[1], hasInterestedPartyNumberOptions[2]]
	};
};

module.exports = {
	getPageData
};
