const express = require('express');
const { postUrlController, showUrlController } = require('./controller');
const postUrlValidator = require('./middleware');

const router = express.Router();

router.post("/",postUrlValidator, postUrlController);
router.get("/:short_url", showUrlController);

module.exports = router;