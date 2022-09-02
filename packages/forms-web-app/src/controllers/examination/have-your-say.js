const {
	routesConfig: {
		examination: {
			pages: {
				haveYourSay: { view: examinationHaveYourSayView }
			}
		}
	}
} = require('../../routes/config');

const setData = () => {
	return {
		backLinkUrl: '#main-content'
	};
};

const getHaveYourSay = (req, res) => {
	res.render(examinationHaveYourSayView, setData());
};

const postHaveYourSay = (req, res) => {
	res.render(examinationHaveYourSayView, setData());
};

module.exports = {
	getHaveYourSay,
	postHaveYourSay
};
