const {
	VIEW: {
		EXAMINATION: { WHO_ARE_YOU_SUBMITTING_FOR, YOUR_NAME, YOUR_EMAIL_ADDRESS }
	}
} = require('../../lib/views');

const setData = () => ({
	backLinkUrl: `/${WHO_ARE_YOU_SUBMITTING_FOR}`,
	fullName: '',
	title: 'What is your full name?'
});

const getYourName = async (req, res) => {
	res.render(`pages/examination/${YOUR_NAME}`, setData());
};

const postYourName = async (req, res) => {
	const { errors = {}, errorSummary = [] } = req.body;

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		res.render(`pages/examination/${YOUR_NAME}`, {
			errors,
			errorSummary
		});
		return;
	}

	if (req.query.mode === 'edit') {
		res.redirect(`pages/examination/${YOUR_NAME}`);
	} else {
		res.redirect(`pages/examination/${YOUR_EMAIL_ADDRESS}`);
	}
};

module.exports = {
	getYourName,
	postYourName
};
