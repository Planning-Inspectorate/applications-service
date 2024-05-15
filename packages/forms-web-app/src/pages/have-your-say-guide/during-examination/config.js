const { getHaveYourSayGuidePageURL } = require('../_utils/get-have-your-say-guide-page-url');

const duringExaminationRoute = 'have-your-say-examination';

const duringExaminationURL = getHaveYourSayGuidePageURL(duringExaminationRoute);

module.exports = {
	duringExaminationURL
};
