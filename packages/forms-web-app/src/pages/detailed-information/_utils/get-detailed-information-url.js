const { detailedInformationRoute } = require('../config');

const getDetailedInformationURL = () => `/${detailedInformationRoute}`;

module.exports = { getDetailedInformationURL };
