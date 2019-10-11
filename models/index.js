import Sequelize from 'sequelize'

const sequelize = new Sequelize('postgres', 'postgres', 'example', {
  host: 'db',
  dialect: 'postgres'
})

const db = {
  User: sequelize.import('./user')
}

db.sequelize = sequelize
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const syncDb = async (sequelize, tries = 5) => {
  try {
    console.log('authenticating DB')
    await db.sequelize.authenticate()
    console.log('authentication succesful!', 'syncing models')
    await db.sequelize.sync()
  } catch (e) {
    if (!tries) {
      console.log('could not connect to database')
      process.exit(1)
    }
    console.log('err:', e.message, ',trying again in 3 seconds,', tries, 'tries left')
    await wait(3000)
    syncDb(tries - 1)
  }
}

syncDb(sequelize)

export default db