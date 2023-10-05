const jsonwetoken = require('jsonwebtoken');
const {promisify} = require('util');



const jwt = {
    sing:promisify(jsonwetoken.sign),
    verify:promisify(jsonwetoken.verify)
}

module.exports = jwt