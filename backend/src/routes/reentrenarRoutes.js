const express = require('express');
const router = express.Router();
const reentrenarController = require('../controllers/reentrenarController');
const { verifyToken } = require('../middlewares/verifyToken');
const {  isAdmin } = require('../middlewares/auth');

router.use(verifyToken, isAdmin);
router.get('/reentrenar', reentrenarController.reentrenar);
router.get('/injertosNoEntrenados', reentrenarController.injertosNoEntrenados);
router.get('/reentrenamientos', reentrenarController.getReentrenamientos);

module.exports = router;