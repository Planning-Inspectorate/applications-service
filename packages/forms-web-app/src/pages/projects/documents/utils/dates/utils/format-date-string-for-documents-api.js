const dayjs = require('dayjs');
const { documentsApiDateFormat } = require('../config');

const formatDateStringForDocumentsApi = (dateString) =>
	dayjs(dateString).format(documentsApiDateFormat);

module.exports = { formatDateStringForDocumentsApi };
