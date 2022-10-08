const jwt = require('jsonwebtoken');
const secret = 'mySecret'

const getUserID = (request) => {
    const header = request.req.headers.authorization;
    if (!header) {
        throw new GraphQLYogaError("Authenticaton required");
    }
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    return decoded.id;
};

module.exports ={
    getUserID
};