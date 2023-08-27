const typeDefs = `
type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
}

type Auth {
    token: ID!
    user: User
}

type Book {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

input BooksInput {
    bookId: ID!
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Query {
    me: User
}

type Mutation {
    login(email: String!, password: String!): Auth
    createUser(username: String!, email: String!, password: String!): Auth

    saveBook(newBook: BooksInput!): User
    deleteBook(bookId: ID!): User

}
`;

module.exports = typeDefs;
