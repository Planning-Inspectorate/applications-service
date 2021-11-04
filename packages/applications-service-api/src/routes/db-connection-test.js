const express = require('express');
const test = require('../../database/test/test_connection');

const router = express.Router();

const runTests = async (req, res) => {
  try {
    const response = await test.runAll();

    if (response === null) {
      res.status(500).send(`Something went wrong`);
    }

    res.status(200).send(response);
  } catch (e) {
    res.status(500).send(`Something went wrong: ${e}`);
  }
};

router.get('/', runTests);

module.exports = router;
