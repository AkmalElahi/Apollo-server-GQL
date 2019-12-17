exports = module.exports= function(app,mongoose){

    require('./Users/schemas')(app , mongoose)
    require('./Users/resolvers')(app , mongoose)

}