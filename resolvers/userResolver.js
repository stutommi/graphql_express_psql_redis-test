export default {
  Query: {
    getUser: (root, { username }, { models }) => {
      return models.User.findOne({
        where: { username }
      })
    },
    allUsers: (root, args, { models }) => models.User.findAll()
  },

  Mutation: {
    createUser: async (root, args, { models }) => {
      console.log('args', args)
      const haloo = await models.User.create(args)
      console.log('haloo', haloo)
      return haloo
    },
    updateUser: (root, { username, newUsername }, { models }) =>
      models.User.update({ username: newUsername }, { where: { username } }),
    deleteUser: (root, args, { models }) => models.User.destroy({ where: args })

  }
}