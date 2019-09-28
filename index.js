import Promise from 'bluebird'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'
import typeDefs from './typeDefs/typeDefs'
import resolvers from './resolvers/userResolver'
import models from './models'
import redis from 'redis'

// Using redis for caching
const redisClient = redis.createClient()
redisClient.on('error', err => console.log(err.message))
redisClient.on('ready', () => console.log('Redis connected!'))
Promise.promisifyAll(redis)


const server = new ApolloServer({
  typeDefs, resolvers, context: { models, cache: redisClient }
})

const app = express()

server.applyMiddleware({ app })

models.sequelize.sync({force: true}).then(() => app.listen({ port: 3000 }, () => {
  console.log('listening on 3000')
}))