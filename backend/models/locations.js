require('../db/mongoose')
const mongoose = require('mongoose')


 const locationSchema =  new mongoose.Schema({
         location: {
              type: String,
              required: true,
              trim: true
         },
        longitude : {
          type: String,
          required: true,
          trim: true
        },
     latitude: {
              type: String,
            required: true,
             trim: true
     },
   owner: {
     type: mongoose.Schema.Types.ObjectId,
     required: true,
     ref: 'Users'
   }
 })


 const Location = mongoose.model('Locations',locationSchema)
  module.exports = Location
