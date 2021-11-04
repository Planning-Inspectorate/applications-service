const express = require('express');

const interestedPartyController = require('../controllers/interested-party');

const router = express.Router();

router.get('/:caseRef', interestedPartyController.getInterestedParty);
router.post('/', interestedPartyController.createInterestedParty);

module.exports = router;
