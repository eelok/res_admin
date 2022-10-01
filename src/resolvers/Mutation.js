const { where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const constants = require('../constants');
const Mutation = {
    async createUser(parent, args, ctx, info) {
        const { firstName, lastName, email } = args;
        const { db } = ctx;
        const id = uuidv4();
        try {
            const foundUser = await db.User.findOne({
                where: { email }
            });
            if (!foundUser) {
                const newUser = await db.User.create({ id: id, firstName: firstName, lastName: lastName, email });
                return {
                    code: constants.STATUS_CODE_201,
                    sucess: true,
                    message: 'User with ${id} was created',
                };
            }
            return {
                code: constants.STATUS_CODE_400,
                sucess: false,
                message: 'User with ${id} is already exists',
            }

        } catch (err) {
            console.log(err);
            throw err;
        }
    },
    // async createEducation(parent, args, ctx, info) {
    //     const { start, end, shortName, longName, division, description } = args;
    //     const {db} = ctx;
    //     const id = uuidv4();
    //     try {
    //         const newEducaton = await db.Education.create({ id, start, end, shortName, longName, division, description });
    //         return newEducaton;
    //     } catch (err) {
    //         console.log(err);
    //         throw err;
    //     }

    // },
    async createHardSkill(parent, args, ctx, info) {
        const { title } = args;
        const { db } = ctx;
        const id = uuidv4();
        try {
            const newHardSkill = await db.Hardskill.create({ id, title });
            return newHardSkill;
        } catch (err) {
            console.log(err);
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