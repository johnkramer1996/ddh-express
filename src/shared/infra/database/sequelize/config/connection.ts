import { dbConfig, envCongig } from '@src/configs/config'
import { Sequelize } from 'sequelize'

const { host, username, password, database, isSqlite3 } = dbConfig
const dbDialict = isSqlite3 ? 'sqlite3' : 'postgres'
if (envCongig.isDevelopment) console.log(`connection to ${dbDialict}.${database}`)

export const sequelize = isSqlite3
  ? new Sequelize({ dialect: 'sqlite', storage: './database.sqlite', logging: false })
  : new Sequelize({
      username,
      password,
      database,
      host,
      dialect: 'postgres',
      logging: false,
      define: { paranoid: true },
    })

// export const sequelize = new Sequelize({
//   username,
//   password,
//   database,
//   host,
//   dialect: 'postgres',
//   logging: false,
//   define: { paranoid: true },
// })
