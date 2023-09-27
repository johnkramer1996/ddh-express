const { get } = require('env-var')
const env = require('dotenv')
const path = require('path')

const test = process.env.NODE_ENV === 'test'

const devPath = path.resolve(__dirname, '../../../../../../.env')
const testPath = path.resolve(__dirname, '../../../../../../.env.test')
env.config({ path: test ? testPath : devPath })

const config = {
  host: get('DB_HOST').default('localhost').asString(),
  user: get('DB_USER').default('postgres').asString(),
  password: get('DB_PASSWORD').default('password').asString(),
  database: get('DB_NAME').default('ddh').asString(),
}

module.exports = {
  development: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  test: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: '127.0.0.1',
    dialect: 'postgres',
  },
  production: {
    username: 'postgres',
    password: 'root',
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'postgres',
  },
}
