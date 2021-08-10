const jwt = require('jsonwebtoken')
const User = require('../model/userSchema')

const authenticate =async (req,res,next) => {
    try{
        const token = req.cookies.jwtoken
        const verifytoken = jwt.verify(token,process.env.SECRET_KEY)

        const rootUser = await User.findOne({_id:verifytoken, 'tokens.token':token})

        if(!rootUser){
            console.log('user not found')
        }

        req.token = token
        console.log('ye token hai',req.token)
        req.rootUser = rootUser
        console.log('ye User hai',req.rootuser)
        req.userID = rootUser._id
        console.log('ye ID hai',req.userID)

        next()
    }catch{}
}
    


module.exports = authenticate