const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const { postSelfRegistrationData } = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.mySelfRegdata['case_ref'] = req.session.caseRef;
  const registrationData = req.session.mySelfRegdata;
  const ipRefNo = await postSelfRegistrationData(JSON.stringify(registrationData));
  res.render(VIEW.REGISTER.MYSELF.CONFIRMATION, {ipRefNo: ipRefNo, email: req.session.mySelfRegdata.email, projectName: req.session.projectName, claimRef: req.session.claimRef});
};
