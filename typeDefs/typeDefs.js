import {gql} from 'apollo-server-express'

const schema = gql`
  type User {
  id: ID!
  username: String!
  createdAt: String!
  updatedAt: String!
}

  type Query {
  allUsers: [User!]!
  getUser(username: String!): User
}

  type Mutation {
  createUser(username: String!): User!
  updateUser(username: String!, newUsername: String!): [Int!]!
  deleteUser(username: String!): Int!
}
`

export default schema
