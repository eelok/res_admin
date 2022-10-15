const {getUserID} = require('../../util/getUserID');

const getAllHardSkill = async (parent, args, ctx, info) => {
     console.log("Hello");
     const {db, request} = ctx;
     try{
        // const userID = getUserID(request);
        // const foundUser = await db.User.findByPk(id);
        const listOfHardSkills = await db.Hardskill.findAll({
            where: {
                userId: "845eb39c-7bd1-4a17-8756-cad2ee870e8f"
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