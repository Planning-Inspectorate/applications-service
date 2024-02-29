const { registerOfAdviceDetailView } = require('../../../../register-of-advice/detail/config');
const {
	isRegisterOfAdviceDetailURL
} = require('../../../../register-of-advice/detail/_utils/is-register-of-advice-detail-url');

const getView = (path, id) =>
	isRegisterOfAdviceDetailURL(path, id)
		? registerOfAdviceDetailView
		: 'projects/section-51/advice-detail/view.njk';

module.exports = { getView };
