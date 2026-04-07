import { journeyId } from './config.js';
import { clearDataFromSession } from '@planning-inspectorate/dynamic-forms/src/lib/session-answer-store.js';
import { getAnswersFromRes } from '../../../../utils/answers.js';

export function buildSaveController() {
	return async (req, res) => {
		const answers = getAnswersFromRes(res);
		console.log(answers);

		clearDataFromSession({ req, journeyId });
		res.redirect('/');
	};
}
