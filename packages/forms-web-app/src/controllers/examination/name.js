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

const getName = async (req, res) => {
	const { session } = req;
	const examination = session?.examination;

	if (examination && examination['full-name']) {
		setData().fullName = req.session.examination['full-name'];
	}

	res.render(`${ROUTE_PREFIX + YOUR_NAME}`, setData());
};

const postName = async (req, res) => {
	const { body = {}, session } = req;
	const examination = session?.examination;
	const { errors = {}, errorSummary = [] } = body;

	if (errors['full-name'] || Object.keys(errors).length > 0) {
		res.render(`${ROUTE_PREFIX + YOUR_NAME}`, {
			errors,
			errorSummary
		});
		return;
	}

	if (examination && body['full-name']) {
		req.session.examination['full-name'] = body['full-name'];
	}

	if (req.query.mode === 'edit') {
		res.redirect(`${ROUTE_PREFIX + YOUR_NAME}`);
	} else {
		res.redirect(`${ROUTE_PREFIX + YOUR_EMAIL_ADDRESS}`);
	}
};

module.exports = {
	getName,
	postName
};
