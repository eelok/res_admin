const { where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const constants = require('../constants');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const secret = 'mySecret'
const Mutation = {
    async createUser(parent, args, ctx, info) {
        const { firstName, lastName, email, password } = args;
        const { db } = ctx;

        if(password.length < 8){
            throw new Error('Password must be 8 characters or longer');
            // return {
            //     code: constants.STATUS_CODE_400,
            //     sucess: false,
            //     message: 'Password must be 8 characters or longer'
            // }
        }
        const hashedPassword = await bcrypt.hash(password, salt);
        const id = uuidv4();
        try {
            const foundUser = await db.User.findOne({
                where: { email }
            });
            if (!foundUser) {
                const newUser = await db.User.create({
                     id,
                     firstName,
                     lastName,
                     email,
                     password: hashedPassword
                });
                return {
                    user: newUser,
                    token: jwt.sign({id: newUser.id}, secret)
                    // code: constants.STATUS_CODE_201,
                    // sucess: true,
                    // message: 'User with ${id} was created',
                };
            }
            return {
                // code: constants.STATUS_CODE_400,
                // sucess: false,
                // message: 'User with ${id} is already exists',
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    async addHardSkillToUser(parent, args, ctx, info){
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
        } catch(err){
            throw err;
        }

    },
    async addEducationToUser(parent, args, ctx, info) {
        const { userID, start, end, shortName, longName, division, description } = args
        const { db } = ctx;
        const id = uuidv4();
        const foundUser = await db.User.findByPk(userID);
        if (!foundUser) {
            return {
                code: constants.STATUS_CODE_404,
                sucess: false,
                message: `user with id: ${userID} does not exist`
            };
        }
        try {
            const foundEducation = await db.Education.findOne({
                where: {
                    start,
                    end,
                    shortName,
                    longName,
                    division, 
                }
            });
            if(!foundEducation){
                const education = await db.Education.create({ id, start, end, shortName, longName, division, description });
                if(!education){
                    return {
                        code: constants.STATUS_CODE_404,
                        sucess: false,
                        message: `education with id ${education.id} was not created`  
                    }
                }
                const res = await foundUser.addEducation(education, { through: db.User_Education });
                return {
                    code: constants.STATUS_CODE_201,
                    sucess: true,
                    message: `education wiht id ${education.id} was added to ${foundUser.id}` 
                };
            }
            const recordUserEducation = await db.User_Education.findOne({
                where: {
                    userId: foundUser.id,
                    educationId: foundEducation.id
                }
            });
            console.log(recordUserEducation);
            if(recordUserEducation){
                return {
                    code: constants.STATUS_CODE_404,
                    sucess: false,
                    message: `${foundUser.id} alrady has the edcucaton ${foundEducation.id}`
                };
            }
            const res = await foundUser.addEducation(education, { through: db.User_Education });
            console.log(res);
            return {
                code: constants.STATUS_CODE_201,
                sucess: true,
                message: `education wiht id ${education.id} was added to ${foundUser.id}` 
            };
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}

module.exports = {
    Mutation
}