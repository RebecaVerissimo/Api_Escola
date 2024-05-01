const { Router, query } = require('express') 
const AlunoController = require('../controllers/AlunoController')

const { auth } = require('../middleware/auth')

const alunoRoutes = new Router()

alunoRoutes.post('/', AlunoController.cadastrar)
alunoRoutes.get('/', auth, AlunoController.listarTodos)
alunoRoutes.get('/:id', auth, AlunoController.listarUm)
alunoRoutes.put('/:id', auth, AlunoController.atualizarUm)
alunoRoutes.delete('/:id', auth, AlunoController.deletarUm)

module.exports = alunoRoutes