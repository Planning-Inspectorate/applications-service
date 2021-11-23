const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const { postSelfRegistrationData } = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.mySelfRegdata['claim-ref'] = req.session.claimRef;
  const registrationData = req.session.mySelfRegdata;
  const respData = await postSelfRegistrationData(registrationData);
  res.render(VIEW.REGISTER.MYSELF.CONFIRMATION, {ipRefNo: respData.ipRefNo, email: req.session.mySelfRegdata.email, projectName: req.session.projectName, claimRef: req.session.claimRef});
};
