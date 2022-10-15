const {createUser} = require('./user/createUser');
const {loginUser} = require('./user/loginUser');
const {addEducationToUser} = require('./education/addEducationToUser');
const {addHardSkillToUser} = require('./hardSkill/addHardSkillToUser');
const {deleteEducation} = require('./education/deleteEducation');
const {deleteHardSkill} = require('./hardSkill/deleteHardSkill');
const {getAllEducation} = require('./education/getAllEducation');
const {getAllHardSkill} = require('../resolvers/hardSkill/getAllHardSkill');
const {getUserByID} = require('./user/getUserByID');

const Mutation = {
    createUser,
    loginUser,
    addEducationToUser,
    addHardSkillToUser,
    deleteEducation,
    deleteHardSkill
}

const Query = {
    getUserByID,
    getAllEducation,
    getAllHardSkill,
}

const User = {
    getAllHardSkill,
    getAllEducation
}
module.exports = {
    Mutation,
    Query,
    User
}