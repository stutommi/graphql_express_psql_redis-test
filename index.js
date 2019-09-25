import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs/typeDefs'
import resolvers from './resolvers/userResolver'
import models from './models'

const server = new ApolloServer({
  typeDefs, resolvers, context: { models }
})

const app = express()

server.applyMiddleware({ app })

models.sequelize.sync().then(() => app.listen({ port: 3000 }, () => {
  console.log('listening on 3000')
}))