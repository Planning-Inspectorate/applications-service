const express = require('express');
const { VIEW } = require('../../lib/views');

const router = express.Router();

router.get('/start', (req, res) => {
    res.render(VIEW.REGISTER.START);
});

router.get('/', (req, res) => {
    res.render(VIEW.REGISTER.START);
});

module.exports = router;