import { journeyId } from './config.js';
import { clearDataFromSession } from '@planning-inspectorate/dynamic-forms/src/lib/session-answer-store.js';
import { getAnswersFromRes } from '../../../../utils/answers.js';
import { setGetUpdatesSubscriptionLinkSentSession } from '../_session/get-updates-subscription-link-sent.js';
import { getUpdatesConfirmYourEmailURL } from '../confirm-your-email/utils/get-updates-confirm-your-email-url.js';
import { postGetUpdatesSubscription } from '../../../../lib/application-api-wrapper.js';
import logger from '../../../../lib/logger.js';
import { getPageData } from './utils/get-page-data.js';

export function buildSaveController() {
	return async (req, res) => {
		const { params, session, i18n } = req;
		const { case_ref: caseRef } = params;

		try {
			const answers = getAnswersFromRes(res);
			console.log(answers);

			await postGetUpdatesSubscription(caseRef, {
				email: answers.email,
				subscriptionTypes: answers.howOften
			});

			setGetUpdatesSubscriptionLinkSentSession(session, true);

			return res.redirect(getUpdatesConfirmYourEmailURL(caseRef));
		} catch (error) {
			logger.error(error);
			return res
				.status(500)
				.render(
					'projects/get-updates/form/includes/error.njk',
					getPageData('error', caseRef, i18n)
				);
		} finally {
			//clear dynamic forms session data
			clearDataFromSession({ req, journeyId });
		}
	};
}
