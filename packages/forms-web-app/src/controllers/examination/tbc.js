const {
	routesConfig: {
		examination: {
			pages: {
				tbc: { view: examinationTbcView }
			}
		}
	}
} = require('../../routes/config');

const setData = {
	pageTitle: 'Page: To be confirmed',
	title: 'Page: To be confirmed'
};

const getTbc = (req, res) => {
	res.render(examinationTbcView, setData);
};

module.exports = {
	getTbc
};
