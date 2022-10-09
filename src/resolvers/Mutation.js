const {createUser} = require('../resolvers/user/createUser');
const {loginUser} = require('../resolvers/user/loginUser');
const {addEducationToUser} = require('./education/addEducationToUser');
const {addHardSkillToUser} = require('./hardSkill/addHardSkillToUser');
const {deleteEducation} = require('../resolvers/education/deleteEducation');
const {deleteHardSkill} = require('../resolvers/hardSkill/deleteHardSkill');

const Mutation = {
    createUser,
    loginUser,
    addEducationToUser,
    addHardSkillToUser,
    deleteEducation,
    deleteHardSkill
}

module.exports = {
    Mutation
}