const express = require('express');
const userController = require('../controllers/user.controller');
const router = express.Router()

router.post('/user/login', userController.LoginUsuario);
router.post('/user/alterar/senha', userController.updateSenha);

module.exports = router;