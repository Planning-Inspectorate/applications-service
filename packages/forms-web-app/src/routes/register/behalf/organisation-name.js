const express = require('express');

const organisationNameController = require('../../../controllers/register/behalf/organisation-name');

const router = express.Router();

router.get('/organisation-name', organisationNameController.getOrganisationName);

router.post('/organisation-name', organisationNameController.postOrganisationName);

module.exports = router;
