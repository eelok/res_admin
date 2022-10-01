const Query = {
    async getUserByID(parent, args, ctx, info){
        const {id} = args;
        const {db} = ctx
        try{
            const foundUser = await db.User.findByPk(id);
            return foundUser;
        } catch(err){
            throw err
        }
    }
}

module.exports = {
    Query
}