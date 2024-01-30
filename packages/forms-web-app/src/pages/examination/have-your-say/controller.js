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

const view = 'examination/have-your-say/view.njk';

const getHaveYourSay = async (req, res, next) => {
	try {
		const { params, session } = req;
		const { case_ref } = params;

		await setupExaminationJourney(session, case_ref);

		return res.render(view, {
			activeId: 'project-have-your-say',
			startNowUrl: `${hasInterestedPartyNumberRoute}`
		});
	} catch (e) {
		logger.error(e);
		if (e.message === 'NO_OPEN_DEADLINES')
			return res.render('examination/have-your-say/no-deadlines-view.njk', {
				activeId: 'project-have-your-say'
			});
		next(e);
	}
};

module.exports = {
	getHaveYourSay
};
