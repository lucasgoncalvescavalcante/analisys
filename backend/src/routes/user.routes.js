const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const userController = require('../controllers/user.controllers');
const dashboardController = require('../controllers/dashboard.controllers');
const contabilController = require('../controllers/contabil.controllers');


// Rota para retornar todos os usuários
router.get('/users', userController.getAllUsers);

// Retorna os dados dos pacientes
router.get('/pacientes', dashboardController.getAtendimentosAtivos);

// Retorna dados do contas a pagar
router.get('/getcontas/:id', contabilController.getContasaPagar);

router.get('/getdata', userController.getDataTablesData);

router.get('/getuserdata/:userid', userController.getUserData);

// Altera conta contabil
router.put('/setcontacontabil', contabilController.setcontaContabil);

//retorna a funcao de todos os usuários
router.get('/getfuncao', userController.getUsersFunction);

// Rota responsável por criar um novo 'User': POST localhost:3000/api/v1/register
router.post('/register', userController.registerNewUser);

//Rota responsavel pelo login do usuário
router.post('/login', userController.loginUser);

//Rota responsavel por retornar informações do usuário localhost:3000/api/v1/userProfile
router.get('/userProfile',auth , userController.returnUserProfile);

module.exports = router;