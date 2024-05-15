const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const takingPartRoute = 'taking-part-pre-application';

const takingPartURL = getHaveYourSayGuidePageURL(takingPartRoute);

module.exports = {
	takingPartURL
};
