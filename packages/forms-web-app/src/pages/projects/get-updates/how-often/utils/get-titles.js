const { mapTitles } = require('../../../../_utils/map-titles');

const titles = {
	index: mapTitles(
		'How often do you want to get emails about the project?',
		'How often do you want to get emails about the project?'
	),
	error: mapTitles('There has been a problem with our system', 'There has been a problem')
};

const getTitles = (responseCode) => titles[responseCode];

module.exports = { getTitles };
