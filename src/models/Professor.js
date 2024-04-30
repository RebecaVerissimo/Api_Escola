const { DataTypes } = require('sequelize')
const { connection } = require('../database/connection')

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING
    },
    data_nascimento: {
        type: DataTypes.DATE 
    },
    materia : {
        type: DataTypes.STRING
    }
})

module.exports = Professor