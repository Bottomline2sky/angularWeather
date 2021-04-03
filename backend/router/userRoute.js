const User = require('../models/user')
const express= require('express')
const router=  new express.Router()
const multer = require('multer')
const auth = require('../auth/auth')
 const sharp = require('sharp')
 const bcrypt = require('bcryptjs')


router.post('/signup',async (req,res)=>{
  try {
      console.log(req.body);

                 const pass=  await bcrypt.hash(req.body.password,8)
    const  user = new User({
      email: req.body.email,
      password:  pass
    });
    const token = await user.generateToken();
    const sendUser = {
      _id: user._id,
      email: user.email,
      token:  token,
      tokenExpDate:  new Date().getTime()+86400000
    }
    res.status(201).json(sendUser);
  }
  catch(e){
     console.log(e);
    res.status(409).send(e);
  }
})
router.post('/login', async (req,res)=> {
  try {

    const user = await User.findOne({email: req.body.email});
    if (!user) {
      if (!user) {
        return res.status(401).json({
          message: "Auth Failed"
        })
      }
    }
      const pass =user.password;
    const isMatched = await bcrypt.compare(req.body.password,pass );
    if (!isMatched) {
      return res.status(401).json({
          message: "Auth Failed"
        }
      )
    }
    const token = await user.generateToken();
    const sendUser = {
      _id: user._id,
      email: user.email,
      token: token,
      tokenExpDate: new Date().getTime() + 900000
    }

    res.status(200).json(sendUser);
  }
     catch  (e) {
          res.status(409).json(e);
     }
})

   router.delete('/logout',auth,async (req,res)=>{
                try{
                          console.log("Gott")
                                     req.user.tokens = [];
                                        await  req.user.save();
                              res.status(201).json({message: "LogOut Successfully"})
                }
                  catch (e) {
                            res.status(409).json({message: "Could Not LogOut"})
                  }
   })

    router.get('/profile/get',auth,(req,res)=>{
             try{
               console.log("Gott")
                  const user = req.user;
                       res.status(200).json(user)
             }
             catch (e) {
                      res.status(409).json({message: 'Sorry'})
             }
    })

    const upload = multer({
        limits:{
            fileSize: 1000000
        },
      fileFilter(req,file,cb) {
             if(!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
                    return cb(new Error('Please Upload image in format of jpg, jpeg,png'))
             }
             cb(undefined,true)
      }
    })



     router.post('/profile/update',auth,multer().fields([]),async (req,res)=>{
                try{
                       const newUser = req.user;
                            newUser.name =  req.body.name;
                             newUser.add =  req.body.add;
                                  newUser.lat= req.body.lat;
                                   newUser.lon = req.body.lon;
                                   await newUser.save();
                                res.status(201).json(newUser)
                }
                catch (e) {
                   console.log(e)
                       res.status(409).json(e);
                }
     })
       router.patch('/profile/update/image',auth,upload.single('image'),async (req,res)=>{
                       try{
                         const  buffer = await sharp(req.file.buffer).resize({width: 250, height: 250}).png().toBuffer();
                               req.user.image  = buffer;
                                 await req.user.save();
                                    res.status(201).json(req.user)

                       }
                       catch(e) {
                           console.log(e);
                            res.status(409).json(e);
                       }
       })

module.exports = router
