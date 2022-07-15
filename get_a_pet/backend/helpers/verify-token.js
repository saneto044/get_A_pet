const jwt = require('jsonwebtoken');
const getToken = require('./get-token')
const secret = process.env.JWT_SECRET

//midlleware to validation token
const checkToken = (req,res,next) => {
 if(!req.headers.authorization){
    return res.status(401).json({message:"Acesso Negado"})
 }
 const token = getToken(req)

 if(!token){
    return res.status(401).json({message:"Acesso Negado"})
 }
 try {
    const verify = jwt.verify(token,secret)
    req.user = verify
    next()
 } catch (error) {
    return res.status(401).json({message:"Acesso Negado"})
 }
}

module.exports = checkToken