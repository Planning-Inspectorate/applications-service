const {
	plannedServiceOutage: { showOutagePage, outageResumeText }
} = require('../config');

const plannedOutage = (req, res, next) => {
	if (showOutagePage) {
		res.set('Cache-Control', 'no-store');
		return res.render('error/planned-outage.njk', { outageResumeText });
	} else {
		next();
	}
};

module.exports = { plannedOutage };
