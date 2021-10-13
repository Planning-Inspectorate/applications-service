const express = require('express');

const typeOfPartyController = require('../../controllers/register/type-of-party');

const router = express.Router();

router.get('/type-of-party', typeOfPartyController.getTypeOfParty);

module.exports = router;