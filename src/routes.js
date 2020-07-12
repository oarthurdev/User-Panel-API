const express = require('express')
const cors = require('cors')
const routes = express.Router()
const UserController = require('./controllers/UserController')

const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

routes.post('/auth/login', cors(corsOptions), UserController.login)
routes.post('/auth/register', cors(corsOptions), UserController.register)
routes.post('/auth/logout', cors(corsOptions), UserController.logout)

// routes.get('/company', UserController.auth, CompanyController.index)

// routes.post('/company/update', UserController.auth, CompanyController.update)

module.exports = routes