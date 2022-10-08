const { GraphQLYogaError } = require('@graphql-yoga/node');
const { v4: uuidv4 } = require('uuid');
const constants = require('../../constants');
const {getUserID} = require('../../util/getUserID');

const addHardSkillToUser = async(parent, args, ctx, info) => {
    const { title } = args;
    const { db, request } = ctx;
    const id = uuidv4();
    const userId = getUserID(request);
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
        throw new GraphQLYogaError(err);
    }
}

module.exports = {
    addHardSkillToUser
}
