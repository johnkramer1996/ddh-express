import { dbConfig, envCongig } from '@src/configs/config'
import { Sequelize } from 'sequelize'

const { host, username, password, database } = dbConfig
if (envCongig.isDevelopment) console.log('connection to ' + database)

export const sequelize = new Sequelize({
  username,
  password,
  database,
  host,
  dialect: 'postgres',
  logging: false,
})
