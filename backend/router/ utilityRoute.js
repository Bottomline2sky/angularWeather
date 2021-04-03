const express = require('express')
const router = new express.Router();
const  monsoon = require('../src/utils')

router.get('/getWeather',(req,res)=>{
  if(!req.query.search){
    return  res.send({error: 'You have not provide search '
    })
  }
  monsoon.fetchWether(req.query.search,(inpu)=>{
    res.send(inpu)
  })
})
  router.get('/getWeatherbyLocation',(req,res)=>{
                  try{
                      const latitude  = req.query.lat;
                        const longitude = req.query.lon;
                        monsoon.weather(latitude,longitude,(weather)=>{
                                        if(!weather)  return res.status(503).json({message: "could not fetch at this location"})
                                        res.status(200).json(weather);
                        })
                  }
                   catch(e) {
                       res.status(400).send("could not Fetch")
                   }
  })
 module.exports = router
