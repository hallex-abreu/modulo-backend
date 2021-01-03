const express = require('express');
const authMiddleware = require('./middlewares/auth');
const multer = require('multer');
const uploadConfig = require('./config/multer');
//Controllers
const UserController = require('./controllers/UserController');

const routes = express.Router();
const upload = multer(uploadConfig);

//Rotas Documentadas
//User
routes.get('/users', UserController.index); //Listagem de todos os usuários (ADM)
routes.get('/users/:id', UserController.show); //Cadatrar-se (USER)
routes.post('/users', UserController.store); //Cadatrar-se (USER)
routes.put('/users/:id', UserController.update); //Cadatrar-se (USER)
routes.delete('/users/:id', UserController.delete); //Cadatrar-se (USER)
routes.get('/users/confirmar/:id', UserController.confirmar_user); //Cadatrar-se (USER)
routes.post('/login', UserController.login); // Login (USER)
routes.post('/forgot-password', UserController.forgot_password);//Recuperacao de password (USER)
routes.post('/reset-password', UserController.reset_password); //Resete de password (USER)
//User
module.exports = routes;  