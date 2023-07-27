const oracledb = require('oracledb');
const fs = require('fs');

exports.getContasaPagar = async (req, res) => {
  try {
    // Obter a função dos usuários no Oracle DB
    const contasid = req.params.id;
    const connection = await oracledb.getConnection();
    const result = await connection.execute(
      `SELECT * FROM contasapagar WHERE CONTASID = :id`, [contasid]
    );

    const data = result.rows.map(row => {
      return {
        id: row[0],
        contacontabil: row[1],
        periodoInicio: row[2],
        periodoFim: row[3],
        lote: row[4]
      };
    });

    await connection.close();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao retornar os dados.', error: err });
  }
};

// Função para lidar com a requisição do DataTables no modo "server-side"
// Função para lidar com a requisição do DataTables no modo "server-side"
exports.getDataTablesData = async (req, res) => {
  try {
    console.log('testando essa bosta');
    const { draw, start, length } = req.query;

    // Realize aqui a consulta ao banco de dados Oracle para obter os dados com base nos parâmetros do DataTables (draw, start, length, etc.)

    // Exemplo de consulta para selecionar apenas os campos "username" e "name"
    const query = `
      SELECT username, name
      FROM users
      WHERE ROWNUM >= :startRow AND ROWNUM <= :endRow
    `;

    const startRow = parseInt(start) + 1;
    const endRow = parseInt(start) + parseInt(length);

    const connection = await oracledb.getConnection();
    const result = await connection.execute(query, { startRow, endRow });
    connection.close();

    const responseData = {
      draw: parseInt(draw),
      recordsTotal: result.rows.length, // Total de registros na tabela (sem paginação)
      recordsFiltered: result.rows.length, // Total de registros após a filtragem (se houver)
      data: result.rows.map(row => ({
        username: row[0],
        name: row[1]
      })), // Mapeando apenas os campos desejados
    };

    res.json(responseData);
  } catch (err) {
    console.error('Erro ao recuperar os dados do DataTables:', err);
    res.status(500).json({ error: 'Erro ao recuperar os dados.' });
  }
};

/*exports.setcontaContabil = async (req, res) => {
  try {
    // Obter a função dos usuários no Oracle DB
    console.log('teste');
    const {contasid, contacontabil } = req.body;
    console.log(contasid);
    const connection = await oracledb.getConnection();
    await connection.execute(
      `UPDATE contasapagar SET contacontabil = :newContacontabil WHERE contasid = :contasid`,
      {
        newContacontabil: contacontabil,
        contasid: contasid
      },
      { autoCommit: true }
    );
    console.log("contaacontabil e contasid ",contacontabil, contasid);

    await connection.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao retornar os dados.', error: err });
  }
};*/
exports.setcontaContabil = async (req, res) => {
  try {
    console.log('teste');
    const { contasid, contacontabil } = req.body;
    console.log(contasid);
    const connection = await oracledb.getConnection();
    
    // Obter a conta contábil anterior antes de atualizar
    const result = await connection.execute(
      `SELECT contacontabil FROM contasapagar WHERE contasid = :contasid`, [contasid]
    );

    const oldContaContabil = result.rows[0][0];
    
    // Atualizar a conta contábil na tabela contasapagar
    await connection.execute(
      `UPDATE contasapagar SET contacontabil = :newContacontabil WHERE contasid = :contasid`,
      {
        newContacontabil: contacontabil,
        contasid: contasid
      },
      { autoCommit: true }
    );
    console.log("contacontabil e contasid ", contacontabil, contasid);

    // Registrar a alteração no arquivo de log
    const logMessage = `Data/Hora: ${new Date().toISOString()}\n` +
                       `ID da Conta: ${contasid}\n` +
                       `Conta Contábil Anterior: ${oldContaContabil}\n` +
                       `Nova Conta Contábil: ${contacontabil}\n\n`;

    fs.appendFile('contasapagar_log.txt', logMessage, (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao registrar a alteração no log.', error: err });
      } else {
        res.status(200).json({ message: 'Alteração realizada com sucesso!' });
      }
    });

    await connection.close();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao realizar a alteração.', error: err });
  }
};
