import { getRegisterDeclarationURL } from '../_common/declaration/_utils/get-register-declaration-url.js';
import { getAnswersFromRes } from '../../../../utils/answers.js';

export function buildSaveController() {
	return async (req, res) => {
		const answers = getAnswersFromRes(res);
		req.session.registerData = answers;

		const url = getRegisterDeclarationURL(req.session.caseRef);
		return res.redirect(url);
	};
}
