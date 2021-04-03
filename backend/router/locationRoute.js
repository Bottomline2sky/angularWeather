const Locations = require('../models/locations')
const express = require('express')
const router = new express.Router();
const auth = require('../auth/auth')

 router.get('/getLocations',auth,async (req,res)=>{
               try{
                          await req.user.populate('locations').execPopulate()
                     res.status(201).json(req.user.locations);
               }
               catch (e) {
                               res.status(400).json(e);
               }
 })

    router.post('/addLocation',auth,async (req,res)=>{
                try{
                      const location =   new Locations({
                                    location: req.body.location,
                                    longitude: req.body.longitude,
                                    latitude: req.body.latitude,
                                     owner: req.user._id
                      });
                                await  location.save();
                  await req.user.populate('locations').execPopulate()
                                      res.status(201).json(req.user.locations);
                }
                catch (e) {
                        res.status(400).json(e);
                }
    })


 module.exports = router
