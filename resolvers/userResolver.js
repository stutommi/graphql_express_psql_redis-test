import { objectToStringArray } from '../util/helperFuncs'

export default {
  Query: {
    getUser: async (root, { username }, { models, cache }) => {
      const redisRes = await cache.hgetallAsync(username)

      // If in cache, return it
      if (redisRes) return redisRes
      console.log('NOT IN CACHE')

      // If not in cache, go dig in DB
      const dbRes = await models.User.findOne({ where: { username } })

      // Save to cache
      await cache.hmsetAsync(username, objectToStringArray(dbRes.dataValues))
      await cache.expire(username, 1200)

      return dbRes
    },
    allUsers: (root, args, { models }) => models.User.findAll()
  },

  Mutation: {
    createUser: async (root, args, { models, cache }) => {
      try {
        // Save to DB
        // eslint-disable-next-line no-unused-vars
        const dbRes = await models.User.create(args)

        // Save to redis
        await cache.hmsetAsync(args.username, objectToStringArray(dbRes.dataValues))
        await cache.expire(args.username, 1200)

        return dbRes
      } catch (error) {
        console.error(error.message)
        return error
      }
    },
    updateUser: async (root, { username, newUsername, ...rest }, { models, cache }) => {
      try {
        // Save to DB
        const dbRes = await models.User.update({ username: newUsername, ...rest }, { where: { username }, returning: true })
        const resValues = dbRes[1][0].dataValues

        // Update to Redis
        await cache.hmsetAsync(username, objectToStringArray(resValues))
        await cache.expire(username, 1200)
        if (username !== newUsername) await cache.rename(username, newUsername)

        return dbRes[1][0].dataValues
      } catch (error) {
        console.error(error.message)
        return error
      }
    },
    deleteUser: async (root, args, { models, cache }) => {
      try {
        // Delete from DB
        const dbRes = await models.User.destroy({ where: args })

        // Delete from cache
        await cache.del(args.username)

        return dbRes
      } catch (error) {
        console.error(error.message)
        return error
      }


    }
  }
}