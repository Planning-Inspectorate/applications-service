const { getAdviceDetailData } = require('../../../services/advice.service');
const view = 'register-of-advice/detail/view.njk';

const getRegisterOfAdviceDetailController = async (req, res, next) => {
	try {
		const { params, query } = req;
		const id = params.id;
		const lang = query.lang;

		const adviceDetail = await getAdviceDetailData(id);
		const backToListUrl = `/register-of-advice${lang ? `?lang=${lang}` : ''}`;

		// Replace with your translation logic if needed
		const backToListText = 'Back to list';

		return res.render(view, {
			...adviceDetail,
			backToListUrl,
			backToListText
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { getRegisterOfAdviceDetailController };
