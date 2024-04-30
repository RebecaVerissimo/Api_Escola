const Curso = require("../models/Curso")
const { Op } = require("sequelize");


class CursoController {

    async cadastar(req,res){
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
            res.status(400).json({message: "Não foi possivel cadastar o curso"})
        }
    }

    async listarTodos(req,res){
        try {
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
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível listar todos os cursos' })
        }
    }

    async deletar(req,res){
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

        return res.status(204).json({})
    }

}    

module.exports = new CursoController