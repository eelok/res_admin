const {createUser} = require('../resolvers/user/createUser');
const {loginUser} = require('../resolvers/user/loginUser');
const {addEducationToUser} = require('./education/addEducationToUser');
const {addHardSkillToUser} = require('./hardSkill/addHardSkillToUser');

const Mutation = {
    createUser,
    loginUser,
    addEducationToUser,
    addHardSkillToUser,
}

module.exports = {
    Mutation
}