const { Router, query } = require('express') // 
const Professor = require('../models/Professor')

const { auth } = require('../middleware/auth')

const professorRoutes = new Router()


professorRoutes.post('/', async (req, res) => {

    try{
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const materia = req.body.materia

        if(!nome) {
            return res.status(400).json({message: 'O nome é obrigatório'})
        }

    
        if(!data_nascimento) {
            return res.status(400).json({message: 'A data de nascimento é obrigatória'})
        }

        if(!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ messagem: 'A data de nascimento é não está no formato correto' }) 
        }

        if(!materia) {
            return res.status(400).json({message: 'A materia é obrigatória'})
        }

        const professor = await Professor.create({
            nome: nome,
            data_nascimento: data_nascimento,
            materia: materia
        })
        res.status(201).json(professor)
         
    } catch (error){
        console.log(error.message)
        res.status(500).json({message: "Não foi possivel cadastrar o professor"})
    }
})

professorRoutes.get('/', auth, async (req, res) => {
    const professores = await Professor.findAll()
    res.json(professores)
})

professorRoutes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body
        let professor = await Professor.findByPk(id)
        if (professor){
           await Professor.update(newData, {where:{id:id}})
       
        res.status(200).send('Dados do Professor atualizados com sucesso.')
        }
        
    } catch (error) {
        return res.status(404).send('Professor não encontrada.')
    }
    
})

professorRoutes.delete('/:id', auth, async (req, res) => {
    const { id } = req.params

    const professor = await Professor.findByPk(id)
    if(!professor){
        return res.status(404).json({message: 'Professor não encontrado'})
    }

    Professor.destroy({
        where: {
            id:id
        }
    })

    return res.status(204).json({})
})

module.exports = professorRoutes