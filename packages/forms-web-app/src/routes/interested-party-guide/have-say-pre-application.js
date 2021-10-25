const { VIEW } = require('../../lib/views');

const express = require('express');
const router = express.Router();

router.get('/have-say-pre-application', (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION);
});
module.exports = router;
