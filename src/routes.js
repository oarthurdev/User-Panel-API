const express = require('express')

const UserController = require('./controllers/UserController')

const routes = express.Router()

routes.post('/auth/login', UserController.login)
routes.post('/auth/register', UserController.register)
routes.post('/auth/logout', UserController.logout)

// routes.get('/company', UserController.auth, CompanyController.index)

// routes.post('/company/update', UserController.auth, CompanyController.update)

module.exports = routes