const { Router, query } = require('express') // 
const Aluno = require('../models/Aluno')

const { auth } = require('../middleware/auth')

const alunoRoutes = new Router()

alunoRoutes.post('/', async (req, res) => {

    try{
        const email = req.body.email
        const password = req.body.password
        const nome = req.body.nome
        const data_nascimento = req.body.data_nascimento
        const celular = req.body.celular

        if(!email) {
            return res.status(400).json({message: 'O email é obrigatório'})
        }

        if(!password) {
            return res.status(400).json({message: 'O password é obrigatório'})
        }

        if(!nome) {
            return res.status(400).json({message: 'O nome é obrigatório'})
        }

    
        if(!data_nascimento) {
            return res.status(400).json({message: 'A data de nascimento é obrigatória'})
        }

        if(!data_nascimento.match(/\d{4}-\d{2}-\d{2}/gm)) {
            return res.status(400).json({ messagem: 'A data de nascimento é não está no formato correto' }) 
        }

        const aluno = await Aluno.create({
            email: email,
            password: password,
            nome: nome,
            data_nascimento: data_nascimento,
            celular: celular
        })
        res.status(201).json(aluno)
         
    } catch (error){
        console.log(error.message)

        if (error.message.includes('duplicada'))
            return res.status(500).json({message: "O email já foi registrado"})

        return res.status(500).json({message: "Não foi possivel cadastrar o aluno"})
    }
})

alunoRoutes.get('/', auth, async (req, res) => {
    const alunos = await Aluno.findAll({
        where: {},
        order: [['id', 'ASC']]})
    res.json(alunos)
})

alunoRoutes.get('/:id', auth, async (req, res) => {
    try {

        const { id } = req.params

        const aluno = await Aluno.findByPk(id)

        if (!aluno) {
            return res.status(404).json({ message: "Usuário não encontrado!" })
        }

        res.json(aluno)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            error: 'Não possível listar o aluno especifico',
            error: error
        })
    }
})

alunoRoutes.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        const newData = req.body
        let aluno = await Aluno.findByPk(id)
        if (aluno){
           await aluno.update(newData, {where:{id:id}})
       
        res.status(200).send('aluno atualizado com sucesso.')
        }
        
    } catch (error) {
        return res.status(404).send('aluno não encontrado.')
    }
    
})


alunoRoutes.delete('/:id', auth, async (req, res) => {
    const { id } = req.params

    const aluno = await Aluno.findByPk(id)
    if(!aluno){
        return res.status(404).json({message: 'aluno não encontrado'})
    }

    aluno.destroy({
        where: {
            id:id
        }
    })

    return res.status(204).json({message: 'aluno removido'})
})

module.exports = alunoRoutes