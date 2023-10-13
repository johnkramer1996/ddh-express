import { dbConfig, envCongig } from '@src/configs/config'
import { Sequelize } from 'sequelize'

const { host, username, password, database } = dbConfig
if (envCongig.isDevelopment) console.log('connection to ' + database)

// 'sqlite::memory:',
export const sequelize = new Sequelize({ dialect: 'sqlite', storage: './database.sqlite', logging: false })

// export const sequelize = new Sequelize({
//   username,
//   password,
//   database,
//   host,
//   dialect: 'postgres',
//   logging: false,
//   define: { paranoid: true },
// })

// export const sequelize = new Sequelize({
//   username,
//   password,
//   database,
//   host,
//   dialect: 'postgres',
//   logging: false,
//   define: { paranoid: true },
// })
