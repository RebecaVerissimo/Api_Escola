const { Router, query } = require('express') 
const CursoController = require('../controllers/CursoController')
const Curso = require('../models/Curso')

const { auth } = require('../middleware/auth')

const cursoRoutes = new Router()

cursoRoutes.post('/', CursoController.cadastar)
cursoRoutes.get('/', auth,  CursoController.listarTodos)
cursoRoutes.delete('/:id', auth, CursoController.deletar)


cursoRoutes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body
        let curso = await Curso.findByPk(id)
        if (curso){
           await Curso.update(newData, {where:{id:id}})
       
        res.status(200).send('Curso atualizado com sucesso.')
        }
        
    } catch (error) {
        return res.status(404).send('Curso não encontrado.')
    }
    
})

module.exports = cursoRoutes