import { gql } from 'apollo-server-express'

const schema = gql`
  type User {
  id: ID!
  username: String!
  firstname: String!
  lastname: String!
  age: Int!
  createdAt: String
  updatedAt: String
}

  type Query {
  allUsers: [User!]!
  getUser(username: String!): User
}

  type Mutation {
  createUser(username: String!, firstname: String!, lastname: String!, age: Int!): User!
  updateUser(username: String!, newUsername: String!, firstname: String!, lastname: String!, age: Int!): User!
  deleteUser(username: String!): Int!
}
`

export default schema
