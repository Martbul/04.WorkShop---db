const {exactErrorMsg} = require('../utils/errorHandle');

module.exports = (err,req,res,next) => {
const errorMessages = exactErrorMsg(err)
res.render('404',{errorMessages})
}