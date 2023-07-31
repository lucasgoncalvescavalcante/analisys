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
    console.log('testeeee');
    const {username, name, functionId, password} = req.body;
    console.log(username);
    console.log(password);

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

// Função para lidar com a requisição do DataTables no modo "server-side"
exports.getDataTablesData = async (req, res) => {
  try {
    console.log('testando essa bosta');
    
    const { draw, start, length, order, columns } = req.query;

    // Convertendo os valores recebidos para uso na consulta SQL
    const orderByColumnIndex = parseInt(order[0].column);
    const orderByColumnName = columns[orderByColumnIndex].data.toUpperCase(); // Convertendo para maiúsculo
    const orderByDirection = order[0].dir.toUpperCase();
    console.log('orderbydirection', orderByDirection)

    // Consulta para obter o número total de registros na tabela (sem paginação)
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM users
    `;

    const connection = await oracledb.getConnection();

    // Consulta para contar o número total de registros
    const resultCount = await connection.execute(countQuery);
    const totalRecords = resultCount.rows[0][0];

    // Consulta para obter os dados com base nos parâmetros do DataTables (paginação)
    const startRow = parseInt(start);
    //const endRow = parseInt(start) + parseInt(length);

    const query = `
      SELECT username, name, isactive
      FROM users
      ORDER BY "${orderByColumnName}" ${orderByDirection}
      OFFSET :startRow ROWS FETCH NEXT :length ROWS ONLY
    `;
    console.log(query, { startRow, length: parseInt(length) } );
    const result = await connection.execute(query, { startRow, length: parseInt(length) });

    connection.close();

    const responseData = {
      draw: parseInt(draw),
      recordsTotal: totalRecords,
      recordsFiltered: totalRecords, // Por enquanto, vamos assumir que não há filtragem
      data: result.rows.map(row => ({
        username: row[0],
        name: row[1],
        editButton: `<button onclick="editUser('${row[0]}')">Editar</button>`,
        isactive: row[2],
      })), // Mapeando apenas os campos desejados
    };
    res.json(responseData);
  } catch (err) {
    console.error('Erro ao recuperar os dados do DataTables:', err);
    res.status(500).json({ error: 'Erro ao recuperar os dados.' });
  }
};


exports.returnUserProfile = async(req, res) => { 
  await res.json(req.userData);
};