var express = require('express');
const memoriaController = require('../controllers/memoriaController');

const router = express.Router();

router.get('/', memoriaController.obtenerMemorias);

module.exports = router;