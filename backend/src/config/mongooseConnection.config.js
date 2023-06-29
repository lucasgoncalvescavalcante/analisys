//const express = require('express');
const mongoose = require('mongoose');

//const database = require('./db.config'); //Conexão local de base de dados


//CONEXAO COM O BANCO DE DADOS
mongoose.Promise = global.Promise; 

mongoose.connect('mongodb://127.0.0.1:27017/analisys', { 
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('a base de dados foi conectada com sucesso');
}, (err) => {
  console.log(`erro ao conectar a base de dados ${err}`);
});
//FIM DA CONEXAO COM O BANCO DE DADOS