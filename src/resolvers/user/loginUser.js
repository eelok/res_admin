const jwt = require('jsonwebtoken');
const { GraphQLYogaError } = require('@graphql-yoga/node');
const bcrypt = require('bcryptjs');
const constants = require('../../constants');

const loginUser = async (parent, args, ctx, info) => {
    const { email, password } = args;
    const { db } = ctx;
    const foundUser = await db.User.findOne({
        where: {
            email
        }
    });
    if (!foundUser) {
        throw new GraphQLYogaError(`Unable to login`);
    }
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
        throw new GraphQLYogaError('Unable to login');
    }
    return {
        user: foundUser,
        token: jwt.sign({ id: foundUser.id }, constants.SECRET)
    }
}

module.exports = {
    loginUser
}