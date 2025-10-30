const express = require('express');
const router = express.Router();

const {getLLMSummary} = require('../controllers/llmControllers');


router.post('/', async (req, res) => await getLLMSummary(req, res));


module.exports = router;