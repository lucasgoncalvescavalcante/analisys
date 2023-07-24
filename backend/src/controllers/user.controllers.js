const User = require('../models/user.model');
const oracledb = require('oracledb');
const jwt = require('jsonwebtoken');

// Conexão com o Oracle DB
const oracleConfig = {
  user: 'SYSTEM',
  password: 'teste123',
  connectString: "localhost:1521/XE"
};

async function connectToOracleDB() {
  try {
    await oracledb.createPool(oracleConfig);
    console.log('Conexão com o Oracle DB estabelecida com sucesso');
  } catch (error) {
    console.error('Erro ao conectar ao Oracle DB:');
    console.error(error);
    process.exit(1);
  }
}

connectToOracleDB();

//=== > Método Responsável

exports.registerNewUser = async (req, res) => {
  try {
    const {username, name, functionId, password} = req.body;


    // Verificar se o usuário já existe no Oracle DB
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM users WHERE username = :username`,
      [username]
    );

    if (result.rows.length >= 1) {
      await connection.close();
      return res.status(409).json({ message: 'Desculpe, este username já está registrado.' });
    }

    // Inserir novo usuário no Oracle DB
    const insertResult = await connection.execute(
      `INSERT INTO users (username, name, function_id, password)
       VALUES (:username, :name, :functionId, :password)`,
      [username, name, functionId, password]
    );

    await connection.commit();
    await connection.close();
    console.log('usuário cadastrado com sucesso : ' + name)
    res.status(201).json({ message: 'Usuário registrado com sucesso.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ err: err });
  }
};


//Async e Await


exports.getAllUsers = async (req, res) => {
  try {
    // Obter todos os usuários do Oracle DB
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM users`
    );

    const users = result.rows.map(row => {
      const user = {};
      result.metaData.forEach((column, index) => {
        user[column.name.toLowerCase()] = row[index];
      });
      return user;
    });

    await connection.close();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao retornar os usuários.', error: err });
  }
};


exports.getUsersFunction = async (req, res) => {
  try {
    // Obter a função dos usuários no Oracle DB
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT function_Id FROM users`
    );

    const users = result.rows.map(row => row[0]);

    await connection.close();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao retornar os usuários.', error: err });
  }
};

// Função para gerar um token de autenticação com as informações do usuário
function generateAuthToken(id, username, name) {
  const payload = {
    id: id,
    username: username,
    name: name
  };

  const token = jwt.sign(payload, 'a92Ajnz@9a-@4', { expiresIn: '1h' }); // O token expirará em 1 hora

  return token;
}

exports.loginUser = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    // Verificar se o usuário existe no Oracle DB
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT ID, NAME, USERNAME FROM users WHERE username = :username AND password = :password`,
      [username, password]
    );

    if (result.rows.length === 0) {
      await connection.close();
      return res.status(409).json({ message: 'Erro ao realizar o login, verifique suas credenciais.' });
    }

    // Obter o usuário do resultado da consulta
    const user = result.rows[0];

    // Gerar token de autenticação com as informações do usuário
    const token = generateAuthToken(user.ID, username, user.NAME);
    console.log("token:");
    console.log(token);

    await connection.close();
    console.log('usuário logado com sucessoooo');
    res.status(200).json({ message: 'usuário(a) logado com sucesso', token: token });
  } catch (err) {
    console.log(err);
    res.status(400).json('Erro ao realizar o login');
  }
};

exports.returnUserProfile = async(req, res) => { 
  await res.json(req.userData);
};