const { featureFlag } = require('../../../config');

const registerOfAdviceIndexRoute = '';
const registerOfAdviceCaseRef = featureFlag.useGeneralS51BackOffice ? 'GS5110001' : 'General';
const registerOfAdviceI18nNamespace = 'registerOfAdvice';

module.exports = {
	registerOfAdviceIndexRoute,
	registerOfAdviceCaseRef,
	registerOfAdviceI18nNamespace
};
