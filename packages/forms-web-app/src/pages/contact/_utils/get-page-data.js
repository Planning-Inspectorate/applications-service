const { mapTitles } = require('../../_utils/map-titles');

const getPageData = () => ({
	...mapTitles('Contact us', 'Contact')
});

module.exports = { getPageData };
