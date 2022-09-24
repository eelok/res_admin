const { v4: uuidv4 } = require('uuid');
const constants = require('../constants');
const Mutation = {
    async createUser(parent, args, ctx, info) {
        const { firstName, lastName, email } = args;
        const {db} = ctx;
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
    async createEducation(parent, args, ctx, info) {
        const { start, end, shortName, longName, division, description } = args;
        const {db} = ctx;
        const id = uuidv4();
        try {
            const newEducaton = await db.Education.create({ id, start, end, shortName, longName, division, description });
            return newEducaton;
        } catch (err) {
            console.log(err);
            throw err;
        }

    },
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
    async addEducationToUser(parent, args, ctx, info){
        const {userID, educationID} = args
        const { db } = ctx;
        const foundUser = await db.User.findByPk(userID);
        const foundEducation = await db.Education.findByPk(educationID);
        if(foundUser && foundEducation){
            const res = await foundUser.addEducation(foundEducation, {through: Users_Educations});
            return res;
        }
        if(!foundUser && !educationID){
            return `${userId} and ${educationID} don't exist`
        }
        if(!foundUser){
            return `${userId} does not exist`;
        } 
        if(!educationID){
            return `${educationID} does not exist`;
        }
    }
}

module.exports = {
    Mutation
}