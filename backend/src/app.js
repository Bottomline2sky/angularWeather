const express=require('express')

 const app=express()
 const locationRouter = require('../router/locationRoute')
 const userRouter = require('../router/userRoute')
  const utilityRouter = require('../router/ utilityRoute')
app.use(express.json())

app.use((req,res,next)=>{
res.setHeader("Access-Control-Allow-Origin","*");
res.setHeader("Access-Control-Allow-Headers",
  "Origin,X-Requested-With,Content-Type,Accept,Authorization");
res.setHeader("Access-Control-Allow-Methods",
  "GET,POST,PATCH,DELETE,OPTIONS");
next();
});






app.use(userRouter)
app.use(utilityRouter)
app.use(locationRouter)




  //Wild Root Router
  app.get('*',(req,res)=>{
         res.send('My 404 Page ')
  })



module.exports = app
