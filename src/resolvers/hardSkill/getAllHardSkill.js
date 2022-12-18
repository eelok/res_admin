const {getUserID} = require('../../util/getUserID');

const getAllHardSkill = async (parent, args, ctx, info) => {
     console.log("Hello");
     const {id} = parent;
     const {db, request} = ctx;
     try{
        // const userID = getUserID(request);
        // const foundUser = await db.User.findByPk(id);
        const listOfHardSkills = await db.Hardskill.findAll({
            where: {
                userId: id
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