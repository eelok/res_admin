const { GraphQLYogaError } = require('@graphql-yoga/node');
const {getUserID} = require('./../../util/getUserID');

const deleteEducation = async (parent, args, ctx, info) => {
    const {id} = args;  
    const {db, request} = ctx;

    try {
        const userID = getUserID(request);
        const foundUser = await db.User.findByPk(userID);
        const foundEducation = await db.Education.findByPk(id);
        const transation = await db.sequelize.transaction();
        const destroyResult = await db.Education.destroy({
            where: {
                id: foundEducation.id
            },
        }, {transation});
        if(destroyResult <= 0){
            await transation.rollback();
            return false;
        }
        await transation.commit();
        return true;
    } catch(err){
        await transation.rollback();
        throw new GraphQLYogaError(err);
    }
}

module.exports = {
    deleteEducation
}