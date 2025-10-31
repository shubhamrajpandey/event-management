const express = require('express');
const { verifyOTP } = require('../controllers/otpController');
const router =express.Router();

router.post('/',verifyOTP);

module.exports = router;