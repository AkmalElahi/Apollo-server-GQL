exports = module.exports = function (app, mongoose) {

    const UserModel = app.db.models.User;

    const resolvers = {
        Query: {
            getAllUsers: async (root, userObj, context) => {
                try {
                    const users = await UserModel.find({})
                    if (!users.length) {
                        throw new Error("No User Found")
                    }
                    return users
                } catch (err) {
                    return Error(err.message)
                }
            }
        },

        Mutation: {
            addUser: async (root, userObj, context) => {
                const { username, email, password } = userObj
                try {
                    const addUser = await UserModel({ username, email, password }).save()
                    if (!addUser) {
                        throw new Error("Cannot add user")
                    }
                    return addUser
                } catch (err) {
                    return Error(err.message)
                }
            }
        }
    }

    app.graphql.resolvers.push([resolvers])
}