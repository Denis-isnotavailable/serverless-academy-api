const express = require('express');
const { recieveAndStoreJsonFile, getJsonFile } = require('./controller');

const router = express.Router();

router.put("/:path", recieveAndStoreJsonFile);
router.get("/:path", getJsonFile);

module.exports = router;