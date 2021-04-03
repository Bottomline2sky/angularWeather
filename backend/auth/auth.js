const  User = require('../models/user')
const jwt = require('jsonwebtoken')

const auth = (async (req,res,next)=>{
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const isIndeed = jwt.verify(token, 'simplekey');
    const user = await User.findOne({_id: isIndeed._id, 'tokens.token': token});
    if (!user) {
      res.status(401).json({
        message: "UnAuthorized"
      })
      return
    }
    req.user = user;
    next();
  }
  catch (e) {
    res.status(400).json({
      message: "fault"
    })
  }
})

module.exports = auth
