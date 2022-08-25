const setData = () => {
	return {
		backLinkUrl: '#main-content'
	};
};

const getYourName = (req, res) => {
	res.render('pages/examination/your-name', setData());
};

const postYourName = (req, res) => {
	res.render('pages/examination/your-name', setData());
};

module.exports = {
	getYourName,
	postYourName
};
