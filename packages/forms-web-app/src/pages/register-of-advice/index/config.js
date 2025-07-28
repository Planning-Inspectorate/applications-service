const { featureFlag } = require('../../../config');

const registerOfAdviceIndexRoute = '';
const generalS51CaseRefNI = 'General';
const generalS51CaseRefCBOS = 'GS5110001';
const registerOfAdviceCaseRef = featureFlag.useGeneralS51BackOffice
	? generalS51CaseRefCBOS
	: generalS51CaseRefNI;
const registerOfAdviceI18nNamespace = 'registerOfAdvice';

module.exports = {
	registerOfAdviceIndexRoute,
	registerOfAdviceCaseRef,
	registerOfAdviceI18nNamespace
};
