const {
	routesConfig: {
		examination: {
			pages: {
				hasInterestedPartyNumber: { route: hasInterestedPartyNumberRoute }
			}
		}
	}
} = require('../../../routes/config');
const logger = require('../../../lib/logger');
const { setupExaminationJourney } = require('./utils/setup/setup-examination-journey');
const { getBackLink } = require('./utils/get-back-link');

const view = 'examination/have-your-say/view.njk';

const getHaveYourSay = async (req, res, next) => {
	try {
		const { params, session } = req;
		const referrer = req.get('Referrer');
		const { case_ref } = params;
		await setupExaminationJourney(session, case_ref);
		return res.render(view, {
			backLinkUrl: getBackLink(case_ref, referrer),
			startNowUrl: `${hasInterestedPartyNumberRoute}`
		});
	} catch (e) {
		logger.error(e);
		if (e.message === 'NO_OPEN_DEADLINES')
			return res.render('examination/have-your-say/no-deadlines-view.njk');
		next(e);
	}
};

module.exports = {
	getHaveYourSay
};
