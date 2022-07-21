const express = require('express');
const router = express.Router();
const injertosController = require('../controllers/injertosController');
const { verifyToken } = require('../middlewares/verifyToken');

router.use(verifyToken)
router.get('/injertos', injertosController.getInjertos);
router.post('/injertos', injertosController.addInjerto);
router.get('/injertos/:id', injertosController.getInjerto); 
router.put('/injertos/:id', injertosController.editInjerto);
router.get("/injertos/:id/predecir", injertosController.prediccion);






module.exports = router;