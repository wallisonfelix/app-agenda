var db = require('../config/postgres.js');
var Sequelize = require('sequelize');

//Definição do Modelo

//Representação de um Contato na Agenda
var Contact = db.define('contact', {
	id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
	name: { type: Sequelize.STRING(255), allowNull: false, validate: { notEmpty: { args: true, msg: "Preencha o campo Nome"} } }, 
	email: { type: Sequelize.STRING(255), allowNull: false, unique: true, validate: { isEmail: { args: true, msg: "E-mail inválido"}, notEmpty: { args: true, msg: "Preencha o campo E-mail"} } },
	fone_number: { type: Sequelize.STRING(14), allowNull: false, unique: true, validate: { notEmpty: { args: true, msg: "Preencha o campo Telefone"} } },
}, {
	tableName: "contacts",
	timestamps: true,
	underscored: true,
	indexes: [ {
    		unique: true,
    		fields: ["email"]
    	}, {
    		unique: true,
    		fields: ["fone_number"]
    	} 
    ]
});

//Deleta e Recria o Banco de Dados - Apenas para o ambiente de DESENVOLVIMENTO.
//db.sync( { force: true } );
db.sync();

module.exports.Contact = Contact;
