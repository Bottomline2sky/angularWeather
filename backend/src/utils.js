const request = require('request')
   const yargs= require('yargs')
const coor=function(city,callb){
    const url1=`https://us1.locationiq.com/v1/search.php?key=b6de30700f13d4&q=${city}&format=json&limit=1`
    request({
        url:url1,
        json: true
    },(error,response)=>{
        if(error){
              console.log('Your connection looks broken')
        }
        else if (response.body.error){
              console.log(response.body.error)
             callb(null)
        }
        else {
             const placeName =  response.body[0].display_name.split(",")[0];
             weather(response.body[0].lat, response.body[0].lon,(trick)=>{
                     callb({
                          "location": response.body[0].display_name,
                         "weather": trick,
                          "longitude": response.body[0].lon,
                         "latitude":   response.body[0].lat
                     })
             })
        }
    })
}
const weather= function(latti,longitude,callba){
    const url=`http://api.weatherstack.com/current?access_key=2bb78cc513b4a65da92d5f2172a76b38&query=${latti},${longitude}`
    request ({
        url: url,
        json: true
    },(error,response)=>{
          callba(response.body.current)

    })
}

   const image = function(placeName) {
    console.log(placeName)
                const url = `https://api.unsplash.com/search/photos?page=1&query=${placeName}&client_id=eDHY4WrwU_fG42hDJlTnZcp4buQSu4omEytbWxL5xfY`;
                    console.log(url)
                request({
                   url: url,
                    json: true
                },(error,response)=>{
                        // callb(response.body.results[0].urls.full)
                      if(!response.body.results[0]) {
                           console.log("Crashed No Match")
                      }
                      else {
                        console.log(response.body.results[0].urls.full)
                      }
                })
   }

module.exports={
  fetchWether: coor,
   weather

 }


