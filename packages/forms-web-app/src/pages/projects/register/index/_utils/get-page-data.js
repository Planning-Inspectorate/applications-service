const { formatDate } = require('../../../../../utils/date-utils');
const { mapTitles } = require('../../../../_utils/map-titles');
const { getRegisteringForURL } = require('../../registering-for/_utils/get-registering-for-url');
const {
	featureFlag: { openRegistrationCaseReferences }
} = require('../../../../../config');

const getPageData = ({ DateOfRelevantRepresentationClose }, periodOpen, caseRef) => ({
	...mapTitles(
		'Register to have your say about a national infrastructure project',
		'Register to have your say about a national infrastructure project - National Infrastructure Planning'
	),
	activeId: 'register-index',
	closeDate: DateOfRelevantRepresentationClose ? formatDate(DateOfRelevantRepresentationClose) : '',
	periodOpen,
	registeringForURL: getRegisteringForURL(caseRef),
	registrationReOpened: openRegistrationCaseReferences.includes(caseRef)
});

module.exports = { getPageData };
