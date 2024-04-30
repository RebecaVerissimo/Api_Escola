const { Router } = require('express')
const MatriculaController = require('../controllers/MatriculaController')

const { auth } = require('../middleware/auth')

const matriculaRoutes = new Router()

matriculaRoutes.post('/', auth, MatriculaController.cadastrar)

module.exports = matriculaRoutes