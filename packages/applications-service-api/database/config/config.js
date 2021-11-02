const config = {
  local: {
    username: 'pins',
    password: 'pins',
    database: 'ipclive',
    host: 'db',
    dialect: 'mysql',
  },
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: process.env.MYSQL_DIALECT,
  },
};

const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return config.development;
    case 'local':
      return config.local;
    default:
      return config.local;
  }
};

module.exports = getConfig();
