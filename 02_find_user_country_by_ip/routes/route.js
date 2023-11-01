const express = require('express');
const getRequest = require('../controllers/controller');

const router = express.Router();

router.post("/", getRequest);

module.exports = router;