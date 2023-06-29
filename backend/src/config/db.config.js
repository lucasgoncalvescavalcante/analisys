const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  local: {
    localDatabaseUrl: process.env.DB_URI,
    secret: "password"
  }
};
//lucasgoncalvescavalcante
//bWtkdVMd5i06kYM9