const dayjs = require('dayjs');

const formatDateSubmitted = (date) => dayjs(date).format('D MMMM YYYY');

module.exports = { formatDateSubmitted };
