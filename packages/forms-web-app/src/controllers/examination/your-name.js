const {
	VIEW: {
		EXAMINATION: { WHO_ARE_YOU_SUBMITTING_FOR, YOUR_NAME, YOUR_EMAIL_ADDRESS, ROUTE_PREFIX }
	}
} = require('../../lib/views');

const setData = () => ({
	backLinkUrl: WHO_ARE_YOU_SUBMITTING_FOR,
	fullName: '',
	title: 'What is your full name?'
});

const getYourName = async (req, res) => {
	const { mySelfRegdata } = req.session;

	if (mySelfRegdata && mySelfRegdata['full-name']) {
		setData().fullName = req.session.mySelfRegdata['full-name'];
	}

	res.render(`${ROUTE_PREFIX + YOUR_NAME}`, setData());
};

const postYourName = async (req, res) => {
	const { errors = {}, errorSummary = [] } = req.body;
	const { body = {} } = req;

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		res.render(`${ROUTE_PREFIX + YOUR_NAME}`, {
			errors,
			errorSummary
		});
		return;
	}

	if (req.session && req.session.mySelfRegdata && body['full-name']) {
		req.session.mySelfRegdata['full-name'] = body['full-name'];
	}

	if (req.query.mode === 'edit') {
		res.redirect(`${ROUTE_PREFIX + YOUR_NAME}`);
	} else {
		res.redirect(`${ROUTE_PREFIX + YOUR_EMAIL_ADDRESS}`);
	}
};

module.exports = {
	getYourName,
	postYourName
};
