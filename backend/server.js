const http = require('http')
const app = require('./src/app')

const port = process.env.PORT || 3000


const server = http.createServer(app);

   server.listen(port,()=>{
       console.log("server is listening on the port "+port);
   })
