const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');
const {  isAdmin, isTheSameUserOrAdmin } = require('../middlewares/auth');
const { verifyToken } = require('../middlewares/verifyToken');


router.use(verifyToken);
router.get('/usuarios', isAdmin, usuariosController.getUsuarios);
router.get('/usuarios/:dni', isTheSameUserOrAdmin, usuariosController.getUser);
router.put('/usuarios/:dni', isTheSameUserOrAdmin, usuariosController.editUser);
router.post('/usuarios', isAdmin, usuariosController.crearUsuario);
router.delete("/usuarios/:dni",  isAdmin, usuariosController.deleteUsuario);
/*
router.get('/usuarios', usuariosController.getUsuarios);
router.get('/usuarios/:dni', usuariosController.getUser);
router.put('/usuarios/:dni', usuariosController.editUser);
router.post('/usuarios', usuariosController.crearUsuario);
router.put("/usuarios/:dni/password", usuariosController.modificarContraseña);
router.delete("/usuarios/:dni", usuariosController.deleteUsuario);
*/
module.exports = router;