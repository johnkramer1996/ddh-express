import { Client } from 'pg'
import '../../src/shared/utils/dotenv'
import { dbConfig } from '../../src/configs/config'

const { host, username: user, password, database } = dbConfig

const connection = new Client({ host, user, password, database: 'postgres' })

connection.connect((err) => {
  if (err) throw err
  connection.query(`CREATE DATABASE ${database}`, (err: any, result: any) => {
    if (err && err.code === 'ER_DB_CREATE_EXISTS') {
      console.info('Db already created')
      process.exit(0)
      return
    }

    console.info('Created db')
    process.exit(0)
  })
})
