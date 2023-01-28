const express = require('express');
const indexController = require('../controller/indexController');
const router = express.Router();

router.get('/usuarios', indexController.mostrarUser);
router.post('/usuarios', indexController.crearUser);
router.post('/login', indexController.iniciarSesion)
module.exports = router;