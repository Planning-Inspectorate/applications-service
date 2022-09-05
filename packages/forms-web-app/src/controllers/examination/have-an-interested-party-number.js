const {
	routesConfig: {
		examination: {
			pages: {
				haveAnInterestedPartyNumber: { view: haveAnInterestedPartyNumberView }
			}
		}
	}
} = require('../../routes/config');

const setData = {
	pageTitle: 'Page: To be confirmed',
	title: 'Page: To be confirmed'
};

const getHaveAnInterestedPartyNumber = (req, res) => {
	res.render(haveAnInterestedPartyNumberView, setData);
};

module.exports = {
	getHaveAnInterestedPartyNumber
};
