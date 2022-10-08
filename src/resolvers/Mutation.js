const { where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const constants = require('../constants');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const { GraphQLYogaError } = require('@graphql-yoga/node');
const { getUserID } = require('../util/getUserID');
const {createUser} = require('../resolvers/user/createUser');
const {loginUser} = require('../resolvers/user/loginUser');
const secret = 'mySecret'
const Mutation = {
    createUser,
    loginUser,
    // async createUser(parent, args, ctx, info) {
    //     const { firstName, lastName, email, password } = args;
    //     const { db } = ctx;

    //     if (password.length < 8) {
    //         throw new GraphQLYogaError('Password must be 8 characters or longer');
    //     }
    //     const hashedPassword = await bcrypt.hash(password, salt);
    //     const id = uuidv4();
    //     try {
    //         const foundUser = await db.User.findOne({
    //             where: { email }
    //         });
    //         if (foundUser) {
    //             throw new GraphQLYogaError('User with the such email is already exists');
    //         }
    //         const newUser = await db.User.create({
    //             id,
    //             firstName,
    //             lastName,
    //             email,
    //             password: hashedPassword
    //         });
    //         return {
    //             user: newUser,
    //             token: jwt.sign({ id: newUser.id }, secret)
    //         }
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }
    // },

    // async loginUser(parent, args, ctx, info) {
    //     const { email, password } = args;
    //     const { db } = ctx;
    //     const foundUser = await db.User.findOne({
    //         where: {
    //             email
    //         }
    //     });
    //     if (!foundUser) {
    //         throw new GraphQLYogaError(`Unable to login`);
    //     }
    //     const isMatch = await bcrypt.compare(password, foundUser.password);
    //     if (!isMatch) {
    //         throw new GraphQLYogaError('Unable to login');
    //     }
    //     return {
    //         user: foundUser,
    //         token: jwt.sign({ id: foundUser.id }, secret)
    //     }
    // },
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

    //todo rename addMyEducation
    async addEducationToUser(parent, args, ctx, info) {
        const { start, end, shortName, longName, division, description } = args
        const { db, request } = ctx;

        try {
            const userID = getUserID(request);
            const foundUser = await db.User.findByPk(userID);
            
            if (!foundUser) {
                return {
                    code: constants.STATUS_CODE_404,
                    sucess: false,
                    message: `user with id: ${decoded.id} does not exist`
                };
            }
            const id = uuidv4();
            const education = await db.Education.create({ id, start, end, shortName, longName, division, description });
            const newUserEducation = await foundUser.addEducation(education, { through: db.User_Education });
            return {
                    code: constants.STATUS_CODE_201,
                    sucess: true,
                    message: `education wiht id ${education.id} was added to ${foundUser.id}`
            };
        } catch (err) {
            console.log(err);
            throw new GraphQLYogaError(err);
        }
    }
}

module.exports = {
    Mutation
}