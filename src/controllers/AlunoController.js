const Aluno = require('../models/Aluno')

class AlunoController {

    async cadastrar(req, res) {
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
    }

    async listarTodos(req, res) {
        try {
            const alunos = await Aluno.findAll({
                where: {},
                order: [['id', 'ASC']]})
            res.json(alunos)
        } catch (error) {
            res.status(500).json({ error: 'Não possível listar os alunos' })
        }
    }

    async listarUm(req, res) {
        try {

            const { id } = req.params
    
            const aluno = await Aluno.findByPk(id)
    
            if (!aluno) {
                return res.status(404).json({ message: "Aluno não encontrado!" })
            }
    
            res.json(aluno)
    
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: 'Não possível listar o aluno especifico',
                error: error
            })
        }
    }

    async atualizarUm(req,res) {
        try {
            const { id } = req.params
            const newData = req.body
            let aluno = await Aluno.findByPk(id)
            if (aluno){
               await aluno.update(newData, {where:{id:id}})
           
            res.status(200).send('Aluno atualizado com sucesso.')
            }
            
        } catch (error) {
            return res.status(404).send('Aluno não encontrado.')
        }
    }

    async deletarUm(req,res) {
        const { id } = req.params

        const aluno = await Aluno.findByPk(id)
        if(!aluno){
            return res.status(404).json({message: 'Aluno não encontrado'})
        }

        aluno.destroy({
            where: {
                id:id
            }
        })

        return res.status(204).json({message: 'Aluno removido'})
    }
}

module.exports = new AlunoController()

