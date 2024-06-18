const { formatDate } = require('../../../../../utils/date-utils');
const { mapTitles } = require('../../../../_utils/map-titles');
const { getRegisteringForURL } = require('../../registering-for/_utils/get-registering-for-url');

const getCloseDate = (
	registrationOpen,
	registrationOpenCloseDate,
	registrationReOpened,
	registrationReOpenedCloseDate
) => {
	let closeDate = false;

	if (registrationOpen && registrationOpenCloseDate)
		closeDate = formatDate(registrationOpenCloseDate);
	else if (registrationReOpened && registrationReOpenedCloseDate)
		closeDate = formatDate(registrationReOpenedCloseDate);

	return closeDate;
};

const getPageData = (
	caseRef,
	{ DateOfRelevantRepresentationClose, DateOfReOpenRelevantRepresentationClose },
	registrationOpen,
	registrationReOpened,
	i18n
) => ({
	...mapTitles(i18n.t('register.titles.pageHeading'), i18n.t('register.titles.pageTitle')),
	activeId: 'register-index',
	closeDate: getCloseDate(
		registrationOpen,
		DateOfRelevantRepresentationClose,
		registrationReOpened,
		DateOfReOpenRelevantRepresentationClose
	),
	registeringForURL: getRegisteringForURL(caseRef),
	registrationOpen,
	registrationReOpened
});

module.exports = { getPageData };
