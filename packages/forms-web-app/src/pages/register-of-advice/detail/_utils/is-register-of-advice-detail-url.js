const { getRegisterOfAdviceDetailURL } = require('./get-register-of-advice-detail-url');

const isRegisterOfAdviceDetailURL = (path, id) => path === getRegisterOfAdviceDetailURL(id);

module.exports = { isRegisterOfAdviceDetailURL };
