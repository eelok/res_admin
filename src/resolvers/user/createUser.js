const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const { GraphQLYogaError } = require('@graphql-yoga/node');
const constants = require('../../constants');

const createUser = async(parent, args, ctx, info) => {
    console.log(constants.SECRET);
    const { firstName, lastName, email, password } = args;
    const { db } = ctx;

    if (password.length < 8) {
        throw new GraphQLYogaError('Password must be 8 characters or longer');
    }
    const hashedPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();
    try {
        const foundUser = await db.User.findOne({
            where: { email }
        });
        if (foundUser) {
            ///проблема с error
            throw new GraphQLYogaError('User with the such email is already exists');
        }
        const newUser = await db.User.create({
            id,
            firstName,
            lastName,
            email,
            password: hashedPassword
        });
        return {
            user: newUser,
            token: jwt.sign({ id: newUser.id }, constants.SECRET)
        }
    } catch (err) {
        console.log(err);
        throw GraphQLYogaError(err);
    }
}

module.exports = {
    createUser
}
