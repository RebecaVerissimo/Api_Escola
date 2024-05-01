const { Router, query } = require('express')
const LoginController = require('../controllers/LoginController')

const loginRoutes = new Router()

loginRoutes.post('/', LoginController.login)

module.exports = loginRoutes
