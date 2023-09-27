import { dbConfig } from '@src/configs/config'
import { Sequelize } from 'sequelize'

const { host, username, password, database } = dbConfig
console.log('connection to ' + database)

export const sequelize = new Sequelize({
  username,
  password,
  database,
  host,
  dialect: 'postgres',
  logging: false,
})
