const express = require('express');
const router = express.Router();
const reentrenarController = require('../controllers/reentrenarController');
const { verifyToken } = require('../middlewares/verifyToken');

router.get('/reentrenar', reentrenarController.reentrenar);