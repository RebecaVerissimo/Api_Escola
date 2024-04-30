const { Router } = require('express')
const alunoRoutes = require("./alunos.route");
const cursoRoutes = require("./cursos.route");
const loginRoutes = require("./login.route");
const professorRoutes = require("./professores.route");
const { Op } = require("sequelize");


const routes = Router()


routes.use('/alunos', alunoRoutes)
routes.use('/cursos', cursoRoutes)
routes.use('/login', loginRoutes)
routes.use('/professores', professorRoutes)

module.exports = routes

