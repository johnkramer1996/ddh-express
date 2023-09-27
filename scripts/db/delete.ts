import { Client } from 'pg'
import '../../src/shared/utils/dotenv'
import { dbConfig } from '../../src/configs/config'

const { host, username: user, password, database } = dbConfig

const connection = new Client({ host, user, password, database: 'postgres' })
console.log(database)
connection.connect((err) => {
  if (err) throw err
  connection.query(`DROP SCHEMA ${database}`, (err: any, result: any) => {
    if (err && err.code === 'ER_DB_CREATE_EXISTS') {
      console.log('Db already deleted')
      process.exit(0)
      return
    }

    console.log('deleted db')
    process.exit(0)
  })
})
