const { VIEW } = require('../../lib/views');

exports.showInfo = async (req, res) => {
  res.render(VIEW.REGISTER.REGISTRATION_PERIOD_CLOSED, {
    projectName: req.session.projectName,
  });
};
