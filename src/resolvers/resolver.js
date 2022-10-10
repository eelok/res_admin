const {createUser} = require('./user/createUser');
const {loginUser} = require('./user/loginUser');
const {addEducationToUser} = require('./education/addEducationToUser');
const {addHardSkillToUser} = require('./hardSkill/addHardSkillToUser');
const {deleteEducation} = require('./education/deleteEducation');
const {deleteHardSkill} = require('./hardSkill/deleteHardSkill');
const {getAllEducationByUserID} = require('./education/getAllEducationByUserID');
const {getAllHardSkill} = require('../resolvers/hardSkill/getAllHardSkill');

const Mutation = {
    createUser,
    loginUser,
    addEducationToUser,
    addHardSkillToUser,
    deleteEducation,
    deleteHardSkill
}

const Query = {
    // async getUserByID(parent, args, ctx, info){
    //     const {id} = args;
    //     const {db} = ctx
    //     try{
    //         const foundUser = await db.User.findByPk(id);
    //         return foundUser;
    //     } catch(err){
    //         throw err
    //     }
    // },
    getAllEducationByUserID,
    getAllHardSkill
}

module.exports = {
    Mutation,
    Query
}