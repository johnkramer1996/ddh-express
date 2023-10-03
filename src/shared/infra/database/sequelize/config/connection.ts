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
  define: { underscored: true, paranoid: true },
  // define: { updatedAt: 'updated_at', createdAt: 'created_at', deletedAt: 'deleted_at' },
})
