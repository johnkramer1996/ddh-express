import { get } from 'env-var'

const PORT = get('PORT').default(5000).asInt()
const ENV = get('NODE_ENV').default('development').asString()
const isDevelopment = ENV === 'development'
const isProduction = ENV === 'production'
const isTest = ENV === 'test'

const dbConfig = {
  host: get('DB_HOST').default('localhost1').asString(),
  username: get('DB_USERNAME').default('postgres1').asString(),
  password: get('DB_PASSWORD').default('root1').asString(),
  database: get('DB_NAME').default('ddh1').asString(),
}

const envCongig = {
  ENV,
  isDevelopment,
  isTest,
  isProduction,
}

const redisConfig = {
  host: 'localhost',
  port: 6379,
}

const repositoryConfig = {
  limit: 15,
}

const authConfig = {
  secret: 'ukrainer',
  tokenExpiryTime: 5,
}

export { dbConfig, envCongig, repositoryConfig, redisConfig, authConfig, PORT }
