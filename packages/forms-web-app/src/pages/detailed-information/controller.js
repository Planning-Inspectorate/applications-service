const { getPageData } = require('./_utils/get-page-data');

const view = 'detailed-information/view.njk';

const getDetailedInformationController = (req, res) => {
	return res.render(view, getPageData(req.i18n.language));
};

module.exports = {
	getDetailedInformationController
};
