import { journeyId } from './config.js';
import { clearDataFromSession } from '@planning-inspectorate/dynamic-forms/src/lib/session-answer-store.js';
import { getAnswersFromRes } from '../../../../utils/answers.js';
import {
	setGetUpdatesSubscriptionLinkSentSession,
	getGetUpdatesSession
} from '../_session/index.js';
import { getUpdatesConfirmYourEmailURL } from '../confirm-your-email/utils/get-updates-confirm-your-email-url.js';
import { postGetUpdatesSubscription } from '../../../../lib/application-api-wrapper.js';
import logger from '../../../../lib/logger.js';

export function buildSaveController() {
	return async (req, res) => {
		const { session } = req;
		const caseRef = getGetUpdatesSession(session)?.caseRef;

		try {
			const answers = getAnswersFromRes(res);

			await postGetUpdatesSubscription(caseRef, {
				email: answers.email,
				subscriptionTypes: answers.howOften.split(',')
			});

			setGetUpdatesSubscriptionLinkSentSession(session, true);

			return res.redirect(getUpdatesConfirmYourEmailURL(caseRef));
		} catch (error) {
			logger.error(error);
			return res.redirect(req.baseUrl);
		} finally {
			//clear dynamic forms session data
			clearDataFromSession({ req, journeyId });
		}
	};
}
