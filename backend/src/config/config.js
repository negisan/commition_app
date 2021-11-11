// require('dotenv').config()

const { DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env

module.exports = {
  development: {
    username: 'postgres',
    password: 'password',
    database: 'database_development',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'database_test',
    host: DB_HOST,
    dialect: 'postgres',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
  },
}
