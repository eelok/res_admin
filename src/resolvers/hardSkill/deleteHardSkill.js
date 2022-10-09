const { GraphQLYogaError } = require('@graphql-yoga/node');
const {getUserID} = require('../../util/getUserID');

const deleteHardSkill = async (parent, args, ctx, info) => {
    const {id} = args;
    const {db, request} = ctx;
    try {
        const userID = getUserID(request);
        const foundUser = await db.User.findByPk(userID);
        const result = await db.Hardskill.destroy({
            where: {
                id
            }
        })
        return true;
    } catch(err){
        throw new GraphQLYogaError(err);
    }
}

module.exports = {
    deleteHardSkill
}