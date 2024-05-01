const { Router, query } = require('express')
const ProfessorController = require('../controllers/ProfessorController')

const { auth } = require('../middleware/auth')

const professorRoutes = new Router()

professorRoutes.post('/', ProfessorController.cadastrar)
professorRoutes.get('/', auth, ProfessorController.listarTodos)
professorRoutes.put('/:id', auth, ProfessorController.atualizarUm)
professorRoutes.delete('/:id', auth, ProfessorController.deletarUm)


module.exports = professorRoutes