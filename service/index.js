
const { ApolloServer } = require("apollo-server");
const connectDB = require('./configs/db');
const { typeDefs } = require('./schema/typeDef')
const { resolvers } = require('./schema/resolvers')

connectDB();
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
    console.log(`factory' API at:${url}`)
})
