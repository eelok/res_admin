const {getUserID} = require('../../util/getUserID');

const getAllEducation = async (parent, args, ctx, info) => {
    const {id: userId} = parent;
    const {db, request} = ctx;
    // const userId = getUserID(request);
    try{
        const foundUser = await db.User.findByPk(userId);
        const allEducations = await foundUser.getEducation();
        return allEducations;
    } catch(err){
        throw new GraphQLYogaError(err);
    }
}

module.exports = {
    getAllEducation
}