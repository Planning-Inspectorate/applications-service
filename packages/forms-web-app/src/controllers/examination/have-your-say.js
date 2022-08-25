const setData = () => {
	return {
		backLinkUrl: '#main-content'
	};
};

const getHaveYourSay = (req, res) => {
	res.render('pages/examination/have-your-say', setData());
};

const postHaveYourSay = (req, res) => {
	res.render('pages/examination/have-your-say', setData());
};

module.exports = {
	getHaveYourSay,
	postHaveYourSay
};
