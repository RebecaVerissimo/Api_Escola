const { Router, query } = require('express') 
const Curso = require('../models/Curso')
const { Op } = require("sequelize");

const { auth } = require('../middleware/auth')

const cursoRoutes = new Router()

cursoRoutes.post('/', async (req, res) => {

    try{
        const nome = req.body.nome
        const duracao_horas = req.body.duracao_horas

        if(!nome) {
            return res.status(400).json({message: 'O nome é obrigatório'})
        }

        if(!(duracao_horas >= 40 && duracao_horas <= 200)) {
            return res.status(400).json({message: 'A duraçao do curso debe ser entre 40-200 hrs'})
        }

        const curso = await Curso.create({
            nome: nome,
            duracao_horas: duracao_horas,
    })
    res.status(201).json(curso)

    } catch (error){
        console.log(error.message)
        res.status(400).json({message: "Não foi possivel adicionar o curso"})
    }

})

cursoRoutes.get('/', auth, async (req, res) => {
    let params = {}

    if(req.query.search_nome)  {
        params.nome = {[Op.iLike]: req.query.search_nome}      
    }

    if(req.query.search_horas)  {
        params.duracao_horas = req.query.search_horas
    }

    const cursos = await Curso.findAll({
        where: params,
        order: [['id', 'ASC']]
    })

    res.json(cursos)
})


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



cursoRoutes.delete('/:id', auth, async (req, res) => {
    const { id } = req.params

    const curso = await Curso.findByPk(id)
    if(!curso){
        return res.status(404).json({message: 'Curso não encontrado'})
    }

    Curso.destroy({
        where: {
            id:id
        }
    })

    return res.status(204).json({message: 'Curso removido'})
})

module.exports = cursoRoutes