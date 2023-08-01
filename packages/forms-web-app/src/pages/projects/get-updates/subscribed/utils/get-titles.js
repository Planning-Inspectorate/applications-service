const { mapTitles } = require('../../../../_utils/map-titles');

const titles = {
	204: mapTitles('Get updates success', 'Get updates success'),
	400: mapTitles('Your email verification link has expired', 'Verification link expired'),
	500: mapTitles('There has been a problem with our system', 'Email system problem')
};

const getTitles = (responseCode) => titles[responseCode];

module.exports = { getTitles };
