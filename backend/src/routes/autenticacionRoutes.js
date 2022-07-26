const express = require('express');
const router = express.Router();
const autenticacionController = require('../controllers/autenticacionController');
const { verifyToken } = require('../middlewares/verifyToken');


router.post("/logout", verifyToken, autenticacionController.logout);
router.post('/login',  autenticacionController.login);


module.exports = router;