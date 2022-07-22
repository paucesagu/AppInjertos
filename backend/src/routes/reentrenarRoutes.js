const express = require('express');
const router = express.Router();
const reentrenarController = require('../controllers/reentrenarController');
const { verifyToken } = require('../middlewares/verifyToken');
const {  isAdmin } = require('../middlewares/auth');

router.use(verifyToken);
router.get('/reentrenar', isAdmin,reentrenarController.reentrenar);

module.exports = router;