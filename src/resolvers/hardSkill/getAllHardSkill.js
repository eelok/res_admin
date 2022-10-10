const {getUserID} = require('../../util/getUserID');

const getAllHardSkill = async (parent, args, ctx, info) => {
     console.log("Hello");
     const {db, request} = ctx;
     try{
        const userID = getUserID(request);
        const foundUser = await db.User.findByPk(userID);
        const listOfHardSkills = await db.Hardskill.findAll({
            where: {
                userId: foundUser.id
            }
        })
        return listOfHardSkills
     } catch(err){
        throw new GraphQLYogaError(err);
     }
}

module.exports = {
    getAllHardSkill
}