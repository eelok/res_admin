const { GraphQLYogaError } = require('@graphql-yoga/node');

const hardSkills = async (parent, args, ctx, info) =>{
    const {id: userId} = parent
    const {db} = ctx;
    try{
        const foundUser = await db.User.findByPk(userId);
        if(!foundUser){
            throw new GraphQLYogaError(`user with id: ${userId} does not exists`);    
        }
        const listOfHardSkills = await db.Hardskill.findAll({
            where: {
                userId
            }
        })
        return listOfHardSkills;
    } catch(err){
        throw new GraphQLYogaError(err);
    }
}

module.exports = {
    hardSkills
}