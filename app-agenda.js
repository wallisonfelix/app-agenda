var model = require('./model/models.js');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http');
var server = http.Server(app);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res) {  
	model.Contact.findAll().then(function (contacts) {
		res.render('listar_contatos', { contacts: contacts, successMessage: null });
	}).catch(function (err) {		
		res.render('erro', {'message': 'Erro ao consultar Contatos.'});
	});
});

app.get('/listar_contatos', function(req, res) { 
	model.Contact.findAll().then(function (contacts) {
		res.render('listar_contatos', { contacts: contacts, successMessage: null });
	}).catch(function (err) {		
		res.render('erro', {'message': 'Erro ao consultar Contatos.'});
	});	
});

app.get('/incluir_contato', function(req, res) {  
	var contact = model.Contact.build({});		
	res.render('manter_contato', {'contact': contact});
});

app.post('/salvarIncluirContato', function(req, res) { 
	var name = req.body.name;
	var email = req.body.email;
	var foneNumber = req.body.foneNumber;	

	model.Contact.create( { name: name, email: email, fone_number: foneNumber } ).then(function (contact) {
		model.Contact.findAll().then(function (contacts) {
			res.render('listar_contatos', { contacts: contacts, successMessage: 'Contato incluído com sucesso.' });
		}).catch(function (err) {		
			res.render('erro', {'message': 'Erro ao consultar Contatos.'});
		});
	}).catch(function (err) {		
		res.render('erro', {'message': 'Erro ao incluir Contato.'});
	});		
});

app.get('/editar_contato', function(req, res) {  
	var idContact = req.query.idContact;
	model.Contact.findById(idContact).then(function (contact) {
		if (!contact) {
			res.render('erro', {'message': 'Contato não encontrado.'});
		}
		res.render('manter_contato', {'contact': contact});
	}).catch(function (err) {		
		res.render('erro', {'message': 'Erro ao consultar Contato.'});
	});	
});

app.post('/salvarEditarContato', function(req, res) { 
	var idContact = req.body.idContact;
	var name = req.body.name;
	var email = req.body.email;
	var foneNumber = req.body.foneNumber;

	model.Contact.update( { name: name, email: email, fone_number: foneNumber }, { where: { id: idContact } } ).then(function (updatedContact) {
		if(updatedContact[0] == 1) {			
			model.Contact.findAll().then(function (contacts) {
				res.render('listar_contatos', { contacts: contacts, successMessage: 'Contato editado com sucesso.' });
			}).catch(function (err) {		
				res.render('erro', {'message': 'Erro ao consultar Contatos.'});
			});
		} else {
			res.render('erro', {'message': 'Contato não encontrado.'});
		}
	}).catch(function (err) {		
		res.render('erro', {'message': 'Erro ao editar Contato.'});
	}); 	
});

app.get('/removerContato', function(req, res) {  	
	var idContact = req.query.idContact;
	model.Contact.destroy( { where: { id: idContact } } ).then(function (qtyDeletedUser) {
		if (qtyDeletedUser == 1) {
			model.Contact.findAll().then(function (contacts) {
				res.render('listar_contatos', { contacts: contacts, successMessage: 'Contato removido com sucesso.' });
			}).catch(function (err) {		
				res.render('erro', {'message': 'Erro ao consultar Contatos.'});
			});
		} else {
			res.render('erro', {'message': 'Contato não encontrado.'});
		}
	}).catch(function (err) {		
		res.render('erro', {'message': 'Erro ao remover Contato.'});
	});
});

//Servidor fica ouvindo a porta 80.
server.listen(8080);
console.log("Servidor escutando na porta 8080!");