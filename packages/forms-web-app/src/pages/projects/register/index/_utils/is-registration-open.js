const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
const { featureFlag } = require('../../../../../config');

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

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

module.exports = { isRegistrationOpen, isRegistrationReOpened };
