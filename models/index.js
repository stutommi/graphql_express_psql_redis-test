import Sequelize from 'sequelize'

const sequelize = new Sequelize('postgres', 'postgres', 'example', {
  host: 'localhost',
  dialect: 'postgres'
})

const db = {
  User: sequelize.import('./user')
}

db.sequelize = sequelize

export default db