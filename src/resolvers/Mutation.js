const { where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const constants = require('../constants');

const { GraphQLYogaError } = require('@graphql-yoga/node');
const { getUserID } = require('../util/getUserID');
const {createUser} = require('../resolvers/user/createUser');
const {loginUser} = require('../resolvers/user/loginUser');
const {addEducationToUser} = require('./education/addEducationToUser');

const Mutation = {
    createUser,
    loginUser,
    addEducationToUser,

    async addHardSkillToUser(parent, args, ctx, info) {
        const { userId, title } = args;
        const { db } = ctx;
        const id = uuidv4();
        try {
            const foundUser = await db.User.findByPk(userId);
            if (!foundUser) {
                return {
                    code: constants.STATUS_CODE_404,
                    sucess: false,
                    message: `user with id: ${userId} does not exist`
                };
            }
            const createdHardSkill = await db.Hardskill.create({
                id,
                title,
                userId: foundUser.id
            });
            return {
                code: constants.STATUS_CODE_201,
                sucess: true,
                message: `a hard skill wiht id ${createdHardSkill.id} was added to user with id ${foundUser.id}`
            }
        } catch (err) {
            throw GraphQLYogaError(err);
        }
    },


   
}

module.exports = {
    Mutation
}