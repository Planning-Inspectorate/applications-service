const express = require('express');

const fullNameController = require('../../controllers/register/full-name');



const router = express.Router();

router.get('/full-name', fullNameController.getFullName);


module.exports = router;