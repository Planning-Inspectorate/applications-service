const { formatDate } = require('../../../../../utils/date-utils');
const { mapTitles } = require('../../../../_utils/map-titles');
const { getRegisterFormURL } = require('../../forms/_utils/get-form-url');

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
	...mapTitles(i18n.t('register.index.pageHeading'), i18n.t('register.index.pageTitle')),
	activeId: 'register-index',
	closeDate: getCloseDate(
		registrationOpen,
		DateOfRelevantRepresentationClose,
		registrationReOpened,
		DateOfReOpenRelevantRepresentationClose
	),
	registerFormURL: getRegisterFormURL(caseRef),
	registrationOpen,
	registrationReOpened
});

module.exports = { getPageData };
