const {createUser} = require('./user/createUser');
const {loginUser} = require('./user/loginUser');
const {addEducationToUser} = require('./education/addEducationToUser');
const {addHardSkillToUser} = require('./hardSkill/addHardSkillToUser');
const {deleteEducation} = require('./education/deleteEducation');
const {deleteHardSkill} = require('./hardSkill/deleteHardSkill');
const {getAllEducationByUserID} = require('./education/getAllEducationByUserID');
const {getAllHardSkill} = require('../resolvers/hardSkill/getAllHardSkill');
const {getUserByID} = require('./user/getUserByID');
const {hardSkills} = require('./hardSkill/hardSkills');

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
    getAllEducationByUserID,
    getAllHardSkill,
}

const User = {
    hardSkills
}
module.exports = {
    Mutation,
    Query,
    User
}