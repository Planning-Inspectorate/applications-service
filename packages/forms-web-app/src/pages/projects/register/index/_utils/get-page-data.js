const { formatDate } = require('../../../../../utils/date-utils');
const { mapTitles } = require('../../../../_utils/map-titles');

const getPageData = ({ DateOfRelevantRepresentationClose }, periodOpen) => ({
	...mapTitles(
		'Register to have your say about a national infrastructure project',
		'Register to have your say about a national infrastructure project - National Infrastructure Planning'
	),
	activeId: 'register-index',
	closeDate: DateOfRelevantRepresentationClose ? formatDate(DateOfRelevantRepresentationClose) : '',
	periodOpen
});

module.exports = { getPageData };
