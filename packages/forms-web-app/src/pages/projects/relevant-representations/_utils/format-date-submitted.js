const moment = require('moment');

const formatDateSubmitted = (date) => moment(date).format('D MMMM YYYY');

module.exports = { formatDateSubmitted };
