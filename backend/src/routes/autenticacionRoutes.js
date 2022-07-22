const express = require('express');
const router = express.Router();
const autenticacionController = require('../controllers/autenticacionController');
const { verifyToken } = require('../middlewares/verifyToken');

/*router.use((req, res, next) => {
    res.header( //ponemos los headers que queremos que devuelva
      "Access-Control-Allow-Headers",
      "authorization, Origin, Content-Type, Accept"
    );
    next();
  });*/

router.post("/logout", verifyToken, autenticacionController.logout);
router.post('/login',  autenticacionController.login);


module.exports = router;