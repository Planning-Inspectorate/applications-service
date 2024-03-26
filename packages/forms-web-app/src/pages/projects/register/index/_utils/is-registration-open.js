const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const { featureFlag } = require('../../../../../config');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

/*
	#isRegistrationClosed
	if registration has been previously open or
	if registration has been re-opened and is now closed
	the registration is determined to be closed
*/
const isRegistrationClosed = ({
	DateOfRepresentationPeriodOpen,
	DateOfRelevantRepresentationClose,
	DateOfReOpenRelevantRepresentationStart,
	DateOfReOpenRelevantRepresentationClose
}) => {
	let registrationClosed = false;

	if (!DateOfRelevantRepresentationClose) registrationClosed = false;
	else if (
		DateOfRepresentationPeriodOpen &&
		dayjs().isAfter(dayjs(DateOfRepresentationPeriodOpen), 'day') &&
		dayjs().isAfter(dayjs(DateOfRelevantRepresentationClose), 'day')
	)
		registrationClosed = true;
	else if (
		DateOfReOpenRelevantRepresentationStart &&
		DateOfReOpenRelevantRepresentationClose &&
		dayjs().isAfter(dayjs(DateOfReOpenRelevantRepresentationStart), 'day') &&
		dayjs().isAfter(dayjs(DateOfReOpenRelevantRepresentationClose), 'day')
	)
		registrationClosed = true;

	return registrationClosed;
};

const isOpen = (openDate, closeDate) =>
	!!openDate &&
	!!closeDate &&
	dayjs().isSameOrAfter(dayjs(openDate), 'day') &&
	dayjs().isSameOrBefore(dayjs(closeDate), 'day');

const isRegistrationReOpened = (
	caseRef,
	{ DateOfReOpenRelevantRepresentationStart, DateOfReOpenRelevantRepresentationClose }
) =>
	featureFlag.openRegistrationCaseReferences.includes(caseRef) ||
	isOpen(DateOfReOpenRelevantRepresentationStart, DateOfReOpenRelevantRepresentationClose);

const isRegistrationOpen = ({
	DateOfRepresentationPeriodOpen,
	DateOfRelevantRepresentationClose
}) =>
	!DateOfRelevantRepresentationClose ||
	isOpen(DateOfRepresentationPeriodOpen, DateOfRelevantRepresentationClose);

module.exports = { isRegistrationOpen, isRegistrationReOpened, isRegistrationClosed };
