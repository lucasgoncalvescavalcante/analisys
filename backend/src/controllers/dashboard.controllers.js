const oracledb = require('oracledb');

exports.getAtendimentosAtivos = async (req, res) => {
    try {
      const connection = await oracledb.getConnection();
      const result = await connection.execute(
        `SELECT CD_ATENDIMENTO, CONV_ATENDIME,TP_ATENDIMENTO FROM ATENDIME`
      );
  
      const data = result.rows.map(row => {
        return {
          id: row[0],
          convenio: row[1],
          tipo: row[2]
        };
      });
  
      await connection.close();
      res.json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erro ao retornar os dados.', error: err });
    }
  };