const http = require('http');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const mongoose= require('mongoose');
const {mergeTypes , mergeResolvers} = require('merge-graphql-schemas');
require('dotenv').config()

const app = express()
const httpServer = http.createServer(app)

app.models ={};
app.graphql={};
app.graphql.typeDefs=[];
app.graphql.resolvers=[];

require('./config')(app)
require('./db')(app , mongoose)
require('./models')(app , mongoose)
require('./modules')(app , mongoose)


const typeDefs= app.graphql.typeDefs
const resolvers = app.graphql.resolvers

const GqlServer = new ApolloServer({
    playground: process.env.NODE_ENV === 'production' ? false : true,
    typeDefs:mergeTypes(typeDefs),
    resolvers:mergeResolvers(resolvers)
})

app.get('/data' , (req , res)=>{
    res.send({username:"akmal"})
})

// app.use(cors())
GqlServer.applyMiddleware({app})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT , ()=>{
    console.log(`Server is Running on port ${PORT}` )
})