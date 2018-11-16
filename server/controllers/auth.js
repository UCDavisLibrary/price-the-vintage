const express = require('express');
const router = express.Router();
const logger = require('../lib/logger');
const firebase = require('../lib/firebase');

router.get('/firebase-login', async (req, res) => {
  logger.info('Starting orcid auto flow');

  try {
    res.json({
      token: await firebase.loginAuth0(req.query.token)
    });
  } catch(e) {
    res.status(400).json({
      error : true,
      message: e.message
    });
  }
});

module.exports = router;