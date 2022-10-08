const { GraphQLYogaError } = require('@graphql-yoga/node');
const { v4: uuidv4 } = require('uuid');
const constants = require('../../constants');
const {getUserID} = require('./../../util/getUserID');


    //todo rename addMyEducation
const addEducationToUser = async(parent, args, ctx, info) => {
    const { start, end, shortName, longName, division, description } = args
    const { db, request } = ctx;

    try {
        const userID = getUserID(request);
        const foundUser = await db.User.findByPk(userID);
        
        if (!foundUser) {
            return {
                code: constants.STATUS_CODE_404,
                sucess: false,
                message: `user with id: ${userID} does not exist`
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

module.exports = {
    addEducationToUser
}